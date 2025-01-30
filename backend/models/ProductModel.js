const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true 
    },
    name:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required:true 
    },
    paymentMethod:{
        type: String,
        required: true 
    },
    note:{
        type: String,
        required: true 
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;