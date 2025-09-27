import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // ✅ correct import
import SummaryApi from "../../common";

function AddYourData() {
    const nav = useNavigate();
    const [userId, setUserId] = useState("");
    const [product, setProduct] = useState({
        name: "",
        category: "",
        amount: "",
        date: "",
        paymentMethod: "",
        note: "",
    });

    const notify = (message) => toast(message);

    useEffect(() => {
        const token = sessionStorage.getItem("user");
        if (!token) {
            nav("/login"); // Redirect if no token
        } else {
            try {
                const decodedToken = jwtDecode(token);

                // ✅ Flexible extraction (depends on backend payload)
                if (decodedToken?._id) {
                    setUserId(decodedToken._id);
                } else if (decodedToken?.data?._id) {
                    setUserId(decodedToken.data._id);
                } else {
                    console.error("Decoded token missing _id:", decodedToken);
                    notify("Session invalid. Please login again.");
                    sessionStorage.clear();
                    nav("/login");
                }
            } catch (error) {
                console.error("Invalid token format or decoding error:", error);
                notify("Session expired. Please login again.");
                sessionStorage.clear();
                nav("/login");
            }
        }
    }, [nav]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allData = {
            ...product,
            userId,
        };

        axios
            .post(SummaryApi.AddProduct.url, allData)
            .then((res) => {
                notify(res.data.message);
                setProduct({
                    name: "",
                    category: "",
                    amount: "",
                    date: "",
                    paymentMethod: "",
                    note: "",
                });
            })
            .catch((err) => {
                notify(err.response?.data?.message || "Something went wrong");
            });
    };

    return (
        <div className="mainAddDataDiv">
            <ToastContainer position="top-center" />
            <div className="addDataFormDiv df">
                <div className="container">
                    <h1>Expense Tracker</h1>
                    <form id="expense-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Expense Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter expense name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            <option value="food-dining">Food & Dining</option>
                            <option value="utilities">Utilities</option>
                            <option value="transportation">Transportation</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="health-fitness">Health & Fitness</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </select>

                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Enter amount"
                            value={product.amount}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={product.date}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="paymentMethod">Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            onChange={handleChange}
                            value={product.paymentMethod}
                            required
                        >
                            <option value="" disabled>
                                Select payment method
                            </option>
                            <option value="cash">Cash</option>
                            <option value="credit-card">Credit Card</option>
                            <option value="debit-card">Debit Card</option>
                            <option value="digital-wallet">Digital Wallet</option>
                            <option value="bank-transfer">Bank Transfer</option>
                        </select>

                        <label htmlFor="note">Notes</label>
                        <textarea
                            id="note"
                            name="note"
                            rows="4"
                            value={product.note}
                            onChange={handleChange}
                            placeholder="Enter additional details."
                        ></textarea>

                        <button type="submit">Add Expense</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddYourData;
