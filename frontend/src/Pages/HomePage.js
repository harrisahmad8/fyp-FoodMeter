import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/home.module.css';
import img from '../images/256_subway.jpg';
import Img from '../images/McDonalds-Logo.png';
import imag from '../images/hardees4024.jpg';
import { featuredRestaurant } from '../api/internal';

import { useRef } from 'react';

export const HomePage = () => {
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
