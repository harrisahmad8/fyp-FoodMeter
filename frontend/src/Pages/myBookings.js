import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/newBooking.css";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useRef } from "react";
import axios from 'axios';

export const Mybookings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [number, setNumber] = useState("");
  const [restaurant, setRestaurant] = useState("");

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/booking', {
        name,
        email,
        date,
        time,
        guests,
        number,
        restaurant,
      });

      if (response.data === "Booking Done") {
        alert("Booking is done!");
        // You can also redirect the user to a thank you page or any other appropriate action.
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
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Number of Guests"
                maxLength={140}
                className="input-field"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <div className="form-row">
              <select
                id="time"
                className="input-field"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="" style={{ color: "black" }}>
                  Select a time
                </option>
                <option value="11:00 AM" style={{ color: "black" }}>
                  11:00 AM
                </option>
                {/* Add more time options here */}
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
            <div className="form-row">
              <select
                id="restaurant"
                className="input-field"
                required
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
              >
                <option value="" style={{ color: "black" }}>
                  Select a restaurant
                </option>
                <option value="Restaurant A" style={{ color: "black" }}>
                  Restaurant A
                </option>
                <option value="Restaurant B" style={{ color: "black" }}>
                  Restaurant B
                </option>
                {/* Add more restaurant options here */}
              </select>
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
