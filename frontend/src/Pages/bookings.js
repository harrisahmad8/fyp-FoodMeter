import React, { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useSelector } from "react-redux";
import { bookings } from "../api/internal";
import { Loader } from "../Components/Loader/Loader";
import "../CSS/bookings.css";


export const Booking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const id= useSelector((state) => state.user._id);
  const[loading,SetLoading]=useState(true)

  useEffect(() => {
    ( async function fetchData(){
      const getUser = await bookings(id);
      if (getUser.status === 200) {
        setAllBookings(getUser.data.data);
        console.log(allBookings)
      }
      SetLoading(false)

    })();
  }, []);

  


  return (

    <div className="body">
    <div className="container">
      <Navbar />
      <div className="content">
        <h2 className="heading">My Bookings</h2>
        <div className="table-container">
        {loading ? (
          <Loader text={" bookings..."}/> 
        ) : allBookings.length > 0 ? ( 
          <table className="table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Date</th>
                <th>Time</th>
                <th>No. of Guests</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
           
            {bookings.map((booking, index) => (
                <tr key={index}>
                  
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guest}</td>
                  <td>{booking.number}</td>
                </tr>
              ))}
        

        
            </tbody>
          </table>
        
        ):(
         <p>
          No bookings 
         </p>
        )
        }
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};