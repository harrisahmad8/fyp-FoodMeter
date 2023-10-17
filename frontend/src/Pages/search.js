import React, { useState } from 'react';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import styles from '../CSS/search.module.css';
import { useRef } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

export const Search = () => {
  const ref = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('/search', { searchTerm }); // Send the search term to the /search endpoint
      console.log(response.data); // Log the response from the Python server
      // You can update the React component with the search results if needed
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <>
      <div className={styles.container}></div>
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.main}>
          <div className={styles.header}>
            {/* Your header content */}
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
