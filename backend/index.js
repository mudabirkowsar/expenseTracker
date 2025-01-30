const express = require("express")
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const authMiddleware = require("./config/authMiddleware.js");
const OpenAI = require("openai")
require('dotenv').config()
const chatbotData = require("./extra/data.js");


//Models 
const User = require("./models/UserModel")
const Product = require("./models/ProductModel")


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());



const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUD_MONGODB_URL = process.env.CLOUD_MONGODB_URL
const GOOGLE_KEY = process.env.GOOGLE_KEY
const MONGODB_URL = process.env.MONGODB_URL


const { GoogleGenerativeAI } = require("@google/generative-ai"); 
const genAI = new GoogleGenerativeAI(GOOGLE_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

mongoose.connect(CLOUD_MONGODB_URL)
    .then((res) => {
        console.log("Connected Successfully")
    })
    .catch(err => { 
        console.log("Error In connection") 
    })


app.post('/getSignupData', async (req, res) => {
    const { name, email, password } = req.body;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(password);
    if (!name || !email || !password) {
        return res.status(500).json({ message: "Enter All The Required Fields ", success: false })
    }
    if (password.length < 8) {
        return res.status(500).json({ message: "Password is too small", success: false })
    }
    if (!hasUppercase || !hasSpecialChar) {
        return res.status(500).json({ message: "Password is EASY", success: false })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
        return res.status(500).json({ message: "User Already Exists. Login Now!", success: false })
    }
    else {
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save()
            .then((ress) => {
                const token = jwt.sign({ data: foundUser }, JWT_SECRET, {
                    expiresIn: "24h"
                })
                res.status(200).json({
                    message: "User Registered Successfully",
                    success: true,
                    tok: token
                })
            })
            .catch(err => {
                res.status(500).json({ message: "Something went wrong please try again!", success: false })
            })
    }
})


app.post('/loginUser', async (req, res) => {

    // Destructure email and password from the request body
    const { loginEmail, loginPassword } = req.body;

    // Validate input
    if (!loginEmail || !loginPassword) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const foundUser = await User.findOne({ email: loginEmail });
        if (foundUser) {
            const decodedPassword = await bcrypt.compare(loginPassword, foundUser.password)
            if (decodedPassword) {
                const token = jwt.sign({ data: foundUser }, JWT_SECRET, {
                    expiresIn: "24h"
                })
                res.json({
                    status: 200,
                    message: "Login successful",
                    success: true,
                    tok: token,
                    data: foundUser
                })
            }
            else {
                res.json({
                    status: 500,
                    message: "Invalid Credentials",
                    success: false,
                })
            }
        }
        else {
            // return res.status(400).json({ message: "User Not Found" });
            return res.json({
                status: 500,
                message: "User Not Found",
                success: false
            })
        }
    } catch (error) {
        // console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

    if (!token) {
        return res.status(401).json({ message: "Access token is missing." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user details to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};


app.post("/addProduct", async (req, res) => {
    const { product, userId } = req.body;
    const name = product.name
    const category = product.category
    const amount = product.amount
    const date = product.date
    const paymentMethod = product.paymentMethod
    const note = product.note

    if (amount <= 0) {
        return res.status(500).json({
            message: "Amount should be greater than 0",
            success: false,
        })
    }

    if (!name || !category || !amount || !date || !paymentMethod || !note) {
        return res.status(500).json({ message: "Enter All The Required Fields " })
    }

    const newProduct = new Product({
        user: userId,
        name,
        category,
        amount,
        date,
        paymentMethod,
        note
    })
    await newProduct.save()
        .then((ress) => {
            res.status(200).json({ message: "Product Added Successfully" })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong please try again!" })
        })
})


app.get("/getItems", async (req, res) => {
    const { userId } = req.query;
    const foundItems = await Product.find({ user: userId }).populate("user")
    // console.log(userPrice)
    res.json(foundItems)
})


app.get("/getAllPrice", async (req, res) => {
    const { userId } = req.query;
    try {
        const userProducts = await Product.find({ user: userId }, "amount").lean();
        const amountArray = userProducts.map(product => product.amount);
        const productDate = await Product.find({ user: userId }, "date").lean();
        const dateArray = productDate.map(product => {
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(new Date(product.date));
            return formattedDate;
        });


        // console.log(dateArray);
        res.status(200).json({
            amount: amountArray,
            date: dateArray
        });
    } catch (err) {
        console.error("Error fetching user prices:", err);
        res.status(500).json({ message: "Error in fetching data" });
    }
});


app.post("/chatBot", async (req, res) => {
    const { message } = req.body;
    // console.log(message)
    // const message = "How Are You"
    try {
        const result = await model.generateContent(message);
        // console.log(result.response.text())
        res.status(200).json({
            response: result.response.text(),
            success: true
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            success: false,
        })
    }
})

app.post("/chatWithBot", (req, res)=> {
    // const question = "How do I add an expense?";
    const {message} = req.body
    if(!question){
        res.json({
            status:500,
            message:"Please provide a question",
            success: false
        })
    }
    const chatResponse = chatbotData.find(
        (chat)=> chat.question.toLowerCase() === question.toLowerCase()  
    ); 

    if(chatResponse){
        // console.log(chatResponse.reply)
        res.json({
            status:200,
            reply : chatResponse.reply,
            success: true
        })
    }
    else{
        res.json({
            status:500,
            reply : "Sorry! I do not understand give me a proper question",
            success: false
        })
    }
})

app.listen(PORT, () => {
    console.log("Listining")
})