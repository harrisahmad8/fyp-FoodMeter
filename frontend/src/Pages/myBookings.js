import React, { useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";

import "../CSS/newBooking.css";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useRef } from "react";
import axios from 'axios';
import { newBooking } from "../api/internal";
import { useSelector } from "react-redux";

export const Mybookings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
  const [number, setNumber] = useState("");
 
  const user = useSelector((state) => state.user._id);
  console.log("usedid",user)

  const ref = useRef(null);
  const location = useLocation();
  console.log("id recieved",location)
  const navigate=useNavigate()
  const restaurant = location.state?.restaurantId || 'No data received';
  console.log(restaurant);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  

  const handleSubmit = async () => {
    const data={
      name,
      email,
      date,
      time,
      guest,
      number,
      restaurant,
      user
    }
    try {
      const response = await newBooking(data)

      if (response.status === 201) {
        alert("Booking is done!");
        navigate("/ReviewPortal",{state:{restaurant:restaurant}})
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Booking failed. Please try again later.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="navbar">
          <Navbar />
        </div>

        <div className="bookPage">
          <div className="contain">
          <h1 className="title">Book a Table</h1>
          <h1 className="caption">Make a reservation at your favorite Restaurant</h1>

          <div className="bookButton" onClick={handleClick}>
            <h6 className="book">Book</h6>
          </div>
          </div>
        </div>

        <div ref={ref} className="main-content">
          <div className="booking-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Enter Name"
                maxLength={140}
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Email"
                maxLength={140}
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Contact Number"
                maxLength={140}
                className="input-field"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Number of Guests"
                maxLength={140}
                className="input-field"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                min={1}
                required
              />
            </div>
            <div className="form-row">
              <select
              type="time"
                id="time"
                className="input-field"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="time" style={{ color: "black" }}>
                  Select a time
                </option>
                <option value="11:00 AM" style={{ color: "black" }}>
                  11:00 AM
                </option>
                <option value="12:00 PM" style={{ color: "black" }}>
                  12:00 PM
                </option>
                <option value="1:00 PM" style={{ color: "black" }}>
                  1:00 PM
                </option>
                <option value="2:00 PM" style={{ color: "black" }}>
                  2:00 PM
                </option><option value="3:00 PM" style={{ color: "black" }}>
                  3:00 PM
                </option><option value="4:00 PM" style={{ color: "black" }}>
                  4:00 PM
                </option><option value="5:00 PM" style={{ color: "black" }}>
                  5:00 PM
                </option><option value="6:00 PM" style={{ color: "black" }}>
                  6:00 PM
                </option><option value="7:00 PM" style={{ color: "black" }}>
                  7:00 PM
                </option>
                <option value="8:00 PM" style={{ color: "black" }}>
                  8:00 PM
                </option>
                <option value="8:00 PM" style={{ color: "black" }}>
                  8:00 PM
                </option>
                <option value="9:00 PM" style={{ color: "black" }}>
                  9:00 PM
                </option>
                <option value="10:00 PM" style={{ color: "black" }}>
                  10:00 PM
                </option>
                
              </select>
            </div>
            <div className="form-row">
              <input
                type="date"
                id="date"
                className="input-field"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </div>
            
            <button className="submit-button" onClick={handleSubmit}>
              Book
            </button>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};
