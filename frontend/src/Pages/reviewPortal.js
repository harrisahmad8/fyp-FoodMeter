// ReviewPortal.js

import React, { useState } from 'react';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/review.module.css';

export const ReviewPortal = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: 'Sample Restaurant',
    foodMeterRating: 4.5,
    userRating: 4.0,
    scrapedComments: ['Scraped Comment 1', 'Scraped Comment 2'],
    userComments: [],
  });

  const addUserComment = (comment) => {
    setRestaurantData((prevData) => ({
      ...prevData,
      userComments: [...prevData.userComments, comment],
    }));
    // You may want to send the comment to the database here
  };

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
                {restaurantData.scrapedComments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
            <div className={styles.commentsBox}>
              <h2>User Comments</h2>
              <ul>
                {restaurantData.userComments.map((comment, index) => (
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
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};
