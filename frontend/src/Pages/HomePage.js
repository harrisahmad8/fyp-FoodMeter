import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import styles from "../CSS/home.module.css";
import { featuredRestaurant, topRated } from "../api/internal";
import { Loader } from "../Components/Loader/Loader";
import { RestaurantCard } from "../Components/restaurantCard";

import { useRef } from "react";

export const HomePage = (props) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [featureRestaurant, SetFeatureRestaurant] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [topRestaurant,SetTopRestaurant]=useState([])

  useEffect(() => {
    (async function fetchData() {
      const getUser = await featuredRestaurant();
      if (getUser.status === 200) {
        SetFeatureRestaurant(getUser.data.restaurant);
        console.log("Feature Restaurant Data:", getUser.data.restaurant);
        console.log(featureRestaurant);
      }

        const rated=await topRated()
        if(rated.status===200){
          SetTopRestaurant(rated.data.restaurant)
          console.log("TOP Restaurant Data:", rated.data.restaurant);
        }
      
    })();

    SetLoading(false)
  }, []);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const renderStar = (rating) => {
    const numberOfStars = Math.min(5, Math.ceil(rating)); // Ensure a maximum of 5 stars
    const filledStars = Array(numberOfStars).fill("★").join("");
    const emptyStars = Array(5 - numberOfStars)
      .fill("☆")
      .join("");

    return (
      <span>
        <span style={{ color: "gold" }}>{filledStars}</span>
        <span style={{ color: "gray" }}>{emptyStars}</span>
      </span>
    );
  };

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.tagline}>
            <h9 className={styles.h9}>Food Meter</h9>
            <h10 className={styles.h10}>
              Your Trustworthy AI Foodie Companion
            </h10>
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
        <hr
          style={{
            width: "80%",
            backgroundColor: "black",
            height: "2px",
            margin: "20px auto",
            border: "none",
          }}
        />
        <div>

        {featureRestaurant?.length > 0 ? (
          <RestaurantCard data={featureRestaurant} />
        ) : (
          <p>No featured restaurant available</p>
        )}
        </div>

<h8 className={styles.h8}>Top Rated Restaurants</h8>

<hr
          style={{
            width: "80%",
            backgroundColor: "black",
            height: "2px",
            margin: "20px auto",
            border: "none",
          }}
        />
        <div className=" shadow-md mb-10 mg-auto">
         {topRestaurant?.length > 0 ? (
          <RestaurantCard data={topRestaurant} />
        ) : (
          <p>No Top restaurant available</p>
        )}
        </div>
      </div>

     
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
