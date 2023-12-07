import { useState, useEffect } from "react";

import { allRestaurant } from "../../api/internal";

import { Loader } from "../../Components/Loader/Loader";
export const HomeRestaurant = () => {
  const [userData, setUserData] = useState([]);
  
  
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      const getUser = await allRestaurant();
      if (getUser.status === 200) {
        setUserData(getUser.data.restaurants);
      }


    SetLoading(false);
 
    })();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Restaurants</h3>
      </div>

      
      <div className="userTable">
      {loading ? (
          <Loader text={" restaurnats..."}/> // Display a loading spinner while data is being fetched
        ) :
        userData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>User Rating</th>
                <th>System Rating</th>
                <th>Featured</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>
                   
                  </td>
                  <td>{user.name}</td>
                  <td>{user.userRating}</td>
                  <td>{user.systemRating}</td>
                  <td>{user.featured}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No restuarnt data available</p>
        )}
      </div>
      
    </main>
  );
};
