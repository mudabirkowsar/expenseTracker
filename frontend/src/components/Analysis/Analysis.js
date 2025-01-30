
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import SummaryApi from '../../common';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analysis() {
  const nav = useNavigate()
  const [price, setPrice] = useState([])
  const [date, setDate] = useState([])


  var userIdd = sessionStorage.getItem("userId")
  let data1 = {
    userId: userIdd
  }

  const notify = (message) => toast(message); // Function to show toast message

  useEffect(() => {
    axios.get(SummaryApi.GetPrice.url, { params: data1 })
      .then((res) => {
        
        setPrice(res.data.amount);
        setDate(res.data.date)
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        notify("Cannot Find price");
      });
  }, [nav]);

  useEffect(() => {
    const token = sessionStorage.getItem("user")
    if (!token) {
      nav("/loginNow")
    }
  })
  const data = {
    labels: date,
    datasets: [
      {
        label: "Expenses",
        data: price,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)", 
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expenses",
      },
    },
  };
  return (
    <div className="chartDiv">
      <Bar data={data} options={options} />
      <ToastContainer/>
    </div>
  )
}

export default Analysis