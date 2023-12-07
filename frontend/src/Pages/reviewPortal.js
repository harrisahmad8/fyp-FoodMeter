import React, { useDebugValue, useState } from 'react';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/review.module.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ReviewPortal = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const restaurantData = location.state?.passedData || 'No data received';
  console.log(restaurantData);

  const sendData = (id )=> {
   navigate('/ReviewPortal', { state: { passedData: id } });
  };

  const addUserComment=()=>{

  }
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1>{restaurantData.name}</h1>
          </div>
          <div className={styles.ratingSection}>
            <div className={styles.ratingBox}>
              <h2>Food Meter Rating</h2>
              <p>{restaurantData.foodMeterRating}/5</p>
            </div>
            <div className={styles.ratingBox}>
              <h2>User Rating</h2>
              <p>{restaurantData.userRating}/5</p>
            </div>
            <div className={styles.graphBox}>
              {/* Bar graph component */}
              {/* You can use a chart library like Chart.js here */}
            </div>
          </div>
          <div className={styles.commentsSection}>
            <div className={styles.commentsBox}>
              <h2>Scraped Comments</h2>
             
              <ul>
                
                {restaurantData.systemComments?.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
            <div className={styles.commentsBox}>
              <h2>User Comments</h2>
              <ul>
                {restaurantData.userComments?.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newComment = e.target.elements.comment.value;
                  addUserComment(newComment);
                  e.target.reset();
                }}
              >
                <input type="text" name="comment" placeholder="Add a comment..." />
                <button type="submit">Add Comment</button>
              </form>
            </div>
            <div> <button onClick={() => sendData(restaurantData._id)}>Reserve a Table</button></div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};
