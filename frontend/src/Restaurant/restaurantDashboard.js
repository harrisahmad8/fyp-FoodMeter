import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/restaurant.module.css';

import { loadStripe } from '@stripe/stripe-js';
import { restaurantName } from '../api/internal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { makeFeatured } from '../api/internal';

export const RestaurantDashboard = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log("storedUser*",storedUser)
  const userName = user ? user.name : null;
  console.log("user1***",userName)
  const [featured,setFeatured]=useState()

  const location=useLocation()
 

  const [restaurantInfo, SetRestaurantInfo] = useState(null);

  useEffect(() => {
    
    (async function fetchData() {
      const getUser = await restaurantName(userName);
      if (getUser?.status === 200) {
        console.log("User: ",getUser);
        SetRestaurantInfo(getUser?.data?.restaurant);
      }
    })();
  }, [userName]);

  if (!restaurantInfo) {
    return <p>Loading...</p>; // You can show a loading message while fetching data
  }
  const make=async()=>{
   
      const getUser = await makeFeatured(userName);
      if (getUser.status === 200) {
       setFeatured(getUser.data.restaurant);
       makepayment()
        
      }
    
  };

  const makepayment = async () => {
    const stripe = await loadStripe("pk_test_51OKNyuK2nOZ0OuadvNqivCJru1SkoNGfcEtdXEnLPMPlKaVZ129Vac4dVoYsh7Gir1Q4Mt3Y5z4rRABkHBxtBVnm00ivvHM2RK");
    const body={
      products:{
        "name":"Feature Restaurant",
        "price":"$10",
        "Time Period":"7 days",
        
      }
      
    }
    console.log("stripe")
    const headers = {
      "Content-Type": "application/json"
    }
    const response = await axios.post("http://localhost:5000/makepayment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });
    

    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.restaurantName}>Dashboard for: {restaurantInfo.name}</h1>
        
        <div className={styles.topSection}>
          <div className={styles.ratingContainer}>
            <div className={styles.ratingBox}>
              <h2>System Rating</h2>
              <p>{restaurantInfo.systemRating}</p>
            </div>
            <div className={styles.ratingBox}>
              <h2>User Rating</h2>
              <p>{restaurantInfo.userRating}</p>
            </div>
            <button className={styles.featureButton} disabled={restaurantInfo.feature}  onClick={make}>Feature {restaurantInfo.name}</button>
          </div>
        </div>

        <div className={styles.commentContainer}>
          <div className={styles.commentBox}>
            <h2>System Comments</h2>
            {restaurantInfo.systemComments.map((comment, index) => (
              <div key={index}>
                <p>{comment.content}</p>
                <p>{comment.rating}</p>
                {index !== restaurantInfo.systemComments.length - 1 && <hr className={styles.commentLine} />}
              </div>
            ))}
          </div>

          <div className={styles.commentBox}>
            <h2>User Comments</h2>
            <p>{restaurantInfo.userComments}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};