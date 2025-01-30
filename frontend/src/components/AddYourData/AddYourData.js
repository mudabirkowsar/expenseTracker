import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import SummaryApi from '../../common';


function AddYourData() {
    const nav = useNavigate()
    // const[name,setName] = useState("");
    const[userId, setUserId] = useState("")
    const notify = (message) => toast(message); // Function to show toast message

    useEffect(() => {
        const token = sessionStorage.getItem("user");
        if (!token) {
            nav('/loginNow'); // Redirect if no token
        } else {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken && decodedToken.data) {
                    // setName(decodedToken.data.name);
                    setUserId(decodedToken.data._id);
                } else {
                    console.error("Decoded token doesn't have the expected structure.");
                }
            } catch (error) {
                console.error("Invalid token format or decoding error:", error);
                nav('/loginNow'); // Redirect if token is invalid
            }
        }
    }, [nav]); // Dependency array with nav
   


    const[product, setProduct] = useState({
        name: '',
        category: '',
        amount: '',
        date: '',
        paymentMethod: '',
        note: ''
    });

    const handleChange = (e)=> {
        const {name, value}= e.target 
        setProduct({
            ...product,
            [name]: value
        });
    }
    const allData = {
        product,
        userId
    }

    const handleSubmit =(e)=> {
        e.preventDefault();
        axios.post(SummaryApi.AddProduct.url, allData)
        // axios.post("http://localhost:5000/addProduct", allData)
        .then((res)=> {
            notify(res.data.message)
        })
        .catch( err=> {
            notify(err.response.data.message)
        })
        setProduct({
            name:'',
            category: '',
            amount: '',
            date: '', 
            paymentMethod: '',
            note: ''
        })
    }
    return (
        <>
            <div className="mainAddDataDiv">
                <ToastContainer
                position='top-center'
                />
                <div className="addDataFormDiv df">
                    <div class="container">
                        <h1>Expense Tracker</h1>
                        <form id="expense-form" onSubmit={handleSubmit}>
                            <label for="name">Expense Name</label>
                            <input type="text"
                            id="name"
                            name="name"
                            placeholder="Enter expense name"
                            value={product.name}
                            onChange={handleChange}
                            required />

                            <label for="category">Category</label>
                            <select id="category" 
                            name="category" 
                            value={product.category}
                            onChange={handleChange}
                            required>
                                <option value="" disabled selected>Select category</option>
                                <option value="food-dining">Food & Dining</option>
                                <option value="utilities">Utilities</option>
                                <option value="transportation">Transportation</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="health-fitness">Health & Fitness</option>
                                <option value="miscellaneous">Miscellaneous</option>
                            </select>

                            <label for="amount">Amount</label>
                            <input type="number" 
                            id="amount" 
                            name="amount" 
                            placeholder="Enter amount" 
                            value={product.amount}
                            onChange={handleChange}
                            required />

                            <label for="date">Date</label>
                            <input type="date" 
                            id="date" 
                            name="date" 
                            value={product.date}
                            onChange={handleChange}
                            required />

                            <label for="paymentMethod">Payment Method</label>
                            <select id="paymentMethod" 
                            name="paymentMethod" 
                            onChange={handleChange}
                            value={product.paymentMethod}
                            required>
                                <option value="" disabled selected>Select payment method</option>
                                <option value="cash">Cash</option>
                                <option value="credit-card">Credit Card</option>
                                <option value="debit-card">Debit Card</option>
                                <option value="digital-wallet">Digital Wallet</option>
                                <option value="bank-transfer">Bank Transfer</option>
                            </select>

                            <label for="note">Notes</label>
                            <textarea id="note" 
                            name="note" 
                            rows="4" 
                            value={product.note}
                            onChange={handleChange}
                            placeholder="Enter additional details."></textarea>

                            <button type="submit">Add Expense</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddYourData