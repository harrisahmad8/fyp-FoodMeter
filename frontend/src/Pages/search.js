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
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle the search button click
  const handleSearch = () => {
    // Make a GET request to localhost:8000 with the search term
    setLoading(true);

    axios.get(`http://localhost:8000/rating/${searchTerm}`)
      .then(response => {
        // Update the state to show the card and store the response data
        setShowCard(true);
        setResponseData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      setLoading(false)
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
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className={styles.searchButton} onClick={handleSearch}>
                Search
              </button>
            </div>
            {loading && (
              <div className={styles.loadingIcon}>
                {/* Display a loading icon while waiting for data */}
                Loading...
              </div>
            )}
            {showCard && (
            <div className={styles.card}>
              <p className={styles.p1}>Restaurant: {responseData.name}</p>
              <p className={styles.p1}>Rating: {responseData.systemRating.toFixed(2)}</p>
              <p className={styles.p1}>Food type: {responseData.foodType}</p>
              <div className={styles.systemComments}>
                <h4 className={styles.h4}>System Comments:</h4>
                {responseData.systemComments.map((comment, index) => (
                  <div key={index} className={styles.comment}>
                    <p>{comment}</p>
                    {index !== responseData.systemComments.length - 1 && <hr className={styles.commentLine} />}
                  </div>
              ))}
              </div>
            </div>
            )}

          </div>
        </div>
        
      </div>
    </>
  );
};
