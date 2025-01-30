import React, { useEffect, useState } from 'react';
import Analysis from '../Analysis/Analysis';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SummaryApi from '../../common';

function Dashboard() {
  const [items, setItems] = useState([]);
  const nav = useNavigate();
  const notify = (message) => toast(message);

  useEffect(() => {
    const token = sessionStorage.getItem("user");
    if (!token) {
      nav('/loginNow'); // Redirect if no token
    }
  }, [nav]);

  useEffect(() => {

    var userIdd = sessionStorage.getItem("userId")
    let data1 = {
      userId: userIdd
    }
    axios.get(SummaryApi.GetItems.url, { params: data1 })
      .then((res) => {
        setItems(res.data);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        notify("Cannot Find Items");
      });
  }, []);

  const totalExpenses = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
  const totalEntries = items.length;
  const highestExpense = Math.max(...items.map(item => parseFloat(item.amount || 0)), 0);

  return (
    <div className="dashboard">
      <ToastContainer
        position='bottom-right' />
      <header>
        <h1>Expense Tracker Dashboard</h1>
      </header>

      <section className="summary">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses}</p>
        </div>
        <div className="card">
          <h3>Total Entries</h3>
          <p>{totalEntries}</p>
        </div>
        <div className="card">
          <h3>Highest Expense</h3>
          <p>₹{highestExpense}</p>
        </div>
      </section>

      <section className="main-content">
        <div className="graphs">
          <h2>Expense Overview</h2>
          <div className="graph-container">
            <Analysis />
            {/* <Link to="" className="view-more">View More</Link> */}
          </div>
        </div>

        <div className="details">
          <h2>Expense Details</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                {/* <th>Date</th> */}
                <th>Payment Method</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name || "N/A"}</td>
                  <td>{item?.category || "N/A"}</td>
                  <td>{item?.amount || "0"}</td>
                  {/* <td>{item?.date ? new Date(item.date).toLocaleDateString() : "N/A"}</td> */}
                  <td>{item?.paymentMethod || "N/A"}</td>
                  <td>{item?.note || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
