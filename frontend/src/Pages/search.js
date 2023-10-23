import React, { useState } from 'react';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/search.module.css';
import { useRef } from 'react';
import axios from 'axios';

export const Search = () => {
  const ref = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCard, setShowCard] = useState(false);

  // Function to handle the search button click
  const handleSearch = () => {
    // Update the state to show the card
    setShowCard(true);
  };

  return (
    <>
      <div className={styles.container}></div>
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.h1}>Search for a Restaurant</h1>
            <div className={styles.searchBarContainer}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={styles.searchButton} onClick={handleSearch}>
                Search
              </button>
            </div>
            {showCard && (
              <div className={styles.card}>
                {/* Content of the white card */}
                <p>This is the white card that appears after search.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
