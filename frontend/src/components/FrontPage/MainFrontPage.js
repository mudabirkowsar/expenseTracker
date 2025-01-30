import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import SummaryApi from '../../common';
import "./MainFrontEnd.css"
import "./Bot.css"

function MainFrontPage() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [openChat, setOpenChat] = useState(false);

    const openChatFunction = ()=>{
        setOpenChat(true)
    }
    const closeChatFunction = ()=> {
        setOpenChat(false)
    }

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        // Add user message to the chat
        const newMessages = [...messages, { sender: "user", text: userInput }];
        setMessages(newMessages);

        try {
            const response = await axios.post(SummaryApi.ChatBot.url, {
                message: userInput,
            });

            // Extract the response text
            const botReply = response.data.response; // Ensure this is a string

            // Add the bot's response to the chat
            setMessages([...newMessages, { sender: "bot", text: botReply }]);
        } catch (err) {
            setMessages([...newMessages, { sender: "bot", text: "Something went wrong. Please try again." }]);
        } finally {
            setUserInput("");
        }
    };

    return (
        <>
            <div className="mainFrontPage">
                <div onClick={openChatFunction} className="chatBotMainButton">
                    <img className='botImage' src="./images/bot3.png" alt="" />
                </div>
                {
                    openChat ?
                        <div className="chatBotMainContainer">
                            <h1 onClick={closeChatFunction} className='closeChatBox'>❌</h1>
                            <div className="chat-container">
                                {/* <h2 className='chath2'>AI Chatbot</h2> */}
                                <div className="chat-window">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`message ${msg.sender}`}>
                                            <div className="bubble">{msg.text}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="chat-input">
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Type your message..."
                                    />
                                    <button onClick={handleSendMessage}>Send</button>
                                </div>
                            </div>
                        </div>
                        : null
                }


                <div className="textDiv df">
                    <h1 className='mainFrontTools h1tool'>We Track Your Spending</h1>
                    <p className='mainFrontTools paratool'>Download or print a your expense tracker to help track your spending.</p>
                    <div className="mainButtonDiv">
                        <Link className='linkTags addButton' to='/adddata'><button className='addMoreBtn df'>Add Data</button></Link>
                        <Link className='linkTags addButton' to='/analyseYourData'><button className='trackBtn df'>Track Your Data</button></Link>
                    </div>
                    <div className="faltuDiv"></div>
                </div>
            </div>

            <div className="secondMainDiv df">
                <div className="secondMainDivLeft df">
                    <img className='imageMoney' src="/images/briefcase.svg" alt="abc" />
                </div>
                <div className="secondMainDivRight">
                    <h1>Your Monthly Expense Tracker for Better Budgeting</h1>
                    <h2>Calculator & Spending Planner for Personal Budgeting</h2>
                    <p>The idea of tracking your expenses can feel overwhelming, especially if you’ve been avoiding it for a while or have never done it before. But once you get started really looking at your budget and finances, you’ll feel a sense of relief and control. Finally getting on top of your money and debts comes with huge pay offs: peace of mind and no more debts!</p>
                    <button className='getStartedBtn'>Get Started</button>

                    {/* <div className="film-strip"></div> */}
                </div>
            </div>

            <div className="monthlyBudget">
                <div className="para df">
                    <p className='p'>Easily track your expenses, manage your budget, and stay on top of your finances.</p>
                    <button className='expensesBtn df'>Your Expenses</button>
                </div>
                <div className="rounded-edge"></div>
            </div>

            {/* footer startts  */}

            <footer className='footerMain'>
                <div className="footerContent df">
                    <h3>Track Your Spending, Build Your Savings.</h3>
                    <div className="iconLinks">
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-square-instagram"></i>
                        <i className="fa-brands fa-square-twitter"></i>
                    </div>

                    <h3 className='designedAndDeveloped'>Designed and Developed by Mudabir Kowsar Khanday</h3>
                </div>
                <div className="rounded-edge2"></div>
            </footer>
        </>
    )
}

export default MainFrontPage