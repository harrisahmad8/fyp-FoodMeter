import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import styles from '../CSS/favorites.module.css'
import img from '../images/256_subway.jpg'
import img1 from '../images/McDonalds-Logo.png'
import img2 from '../images/hardees4024.jpg'
import img3 from '../images/kfc.png'

const BoxCard = ({ data, onRemoveFavorite }) => {
  const handleRemoveFavorite = () => {
    onRemoveFavorite(data.id);
  };

  return (
    <div className={styles.card}>
      <img className={styles.image} src={data.image} alt={data.name} />
      <h3 className={styles.title}>{data.name}</h3>
      <button className={styles.removeButton} onClick={handleRemoveFavorite}>
        Remove
      </button>
    </div>
  );
};

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const dummyFavorites = [
      { id: 1, name: "KFC", image: img3 },
      { id: 2, name: "Mcdonald's", image: img1 },
      { id: 3, name: "Subway", image: img },
      { id: 4, name: "Hardees", image: img2 },
    ];

    setFavorites(dummyFavorites);
  }, []);

  const removeFavorite = (favoriteId) => {
    
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== favoriteId);
    setFavorites(updatedFavorites);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.content}>

        <div className={styles.favoriteWrapper}>
          <h2 className={styles.subheading}>Favorites</h2>
          <div className={styles.favoriteContainer}>
            {favorites.map((favorite) => (
              <BoxCard
                key={favorite.id}
                data={favorite}
                onRemoveFavorite={removeFavorite}
              />
            ))}
          </div>
        </div>

      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};