import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/home.module.css';
import { featuredRestaurant } from '../api/internal';
import { useNavigate } from 'react-router-dom';

import { useRef } from 'react';

export const HomePage = () => {
  const navigate=useNavigate();
  const ref = useRef(null);
  const [featureRestaurant, setFeatureRestaurant] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      const getUser = await featuredRestaurant();
      if (getUser.status === 200) {
        setFeatureRestaurant(getUser.data.restaurant);
        console.log(featureRestaurant)
      }
    })();
  }, []);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const renderStars = (rating) => {
    const numberOfStars = Math.min(5, Math.ceil(rating)); // Ensure a maximum of 5 stars
    const filledStars = Array(numberOfStars).fill('★').join('');
    const emptyStars = Array(5 - numberOfStars).fill('☆').join('');
  
    return (
      <span>
        <span style={{ color: 'gold' }}>{filledStars}</span>
        <span style={{ color: 'gray' }}>{emptyStars}</span>
      </span>
    );
  };

  return (
    <>
      <div className={styles.container}></div>
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.tagline}>
              <h9 className={styles.h9}>Food Meter</h9>
              <h10 className={styles.h10}>Your Trustworthy AI Foodie Companion</h10>
            </div>
            <div className={styles.buttons}>
              <Link to="./search">
                <div className={styles.searchbutton}>
                  <h6 className={styles.h6}>Search Restaurant</h6>
                </div>
              </Link>
              <div className={styles.featured} onClick={handleClick}>
                <h6 className={styles.h7}>Featured Restaurants</h6>
              </div>
            </div>
          </div>
          <div ref={ref}></div>
          <h8 className={styles.h8}>Featured Restaurants</h8>
          <div className={styles.grid}>
            {featureRestaurant.map((restaurant, index) => (
              <div key={index} className={styles.card}>
                <img
                  src={restaurant.logoPath}
                  alt="Restaurant"
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{restaurant.name}</h4>
                  <p className={styles.cardText}>{restaurant.foodType}</p>
                  <p className={styles.cardText}>{renderStars(restaurant.userRating)}</p>
                  <p className={styles.cardText}>{renderStars(restaurant.systemRating)}</p>
                  <Link to="/ReviewPortal" className={styles.cardLink}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
