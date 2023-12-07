import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/restaurant.module.css';


import { useStripe } from '@stripe/react-stripe-js';

import { restaurantName } from '../api/internal';

export const RestaurantDashboard = () => {
  const name = useSelector((state) => state.user.name);
  console.log(name);

  const [restaurantInfo, SetRestaurantInfo] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      const getUser = await restaurantName(name);
      if (getUser.status === 200) {
        SetRestaurantInfo(getUser.data.restaurant);
        console.log(restaurantInfo);
      }
    })();
  }, []);

  if (!restaurantInfo) {
    return <p>Loading...</p>; // You can show a loading message while fetching data
  }

  const MakePayment = async()=>{
    const stripe = useStripe();

    const handleClick = async () => {
      const response = await fetch('/stripe', {
        method: 'POST',
      });
      const session = await response.json();
      console.log(session);
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.error(result.error.message);
      }
}
  }

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
            <button className={styles.featureButton} onClick={MakePayment}>Feature {restaurantInfo.name}</button>
          </div>
        </div>

        <div className={styles.commentContainer}>
          <div className={styles.commentBox}>
            <h2>System Comments</h2>
            {restaurantInfo.systemComments.map((comment, index) => (
              <div key={index}>
                <p>{comment}</p>
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
