import { useState, useEffect } from "react";
import { BsBuilding, BsBuildingFill, BsPeopleFill } from "react-icons/bs";
import { allUsers } from "../../api/internal";
import { allRestaurant } from "../../api/internal";
import { featuredRestaurant } from "../../api/internal";
import { Loader } from "../../Components/Loader/Loader";
export const Home = () => {
  const [userData, setUserData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [featuredRestaurantsData, setFeaturedRestaurantData] = useState([]);
  const [countU, setCountU] = useState(0);
  const [countR, setCountR] = useState(0);
  const [countF, setCountF] = useState(0);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      const getUser = await allUsers();
      if (getUser.status === 200) {
        setUserData(getUser.data.users);
      }

      const getRestaurant = await allRestaurant();
      if (getRestaurant.status === 200) {
        setRestaurantData(getRestaurant.data.restaurants);
      }

      const getFeatured = await featuredRestaurant();
      if (getFeatured.status === 200) {
        setFeaturedRestaurantData(getFeatured.data.restaurant);
      }
      setCountU(getUser.data.users.length);
      console.log(userData);

      setCountR(getRestaurant.data.restaurants.length);
      console.log(restaurantData);
      setCountF(getFeatured.data.restaurant.length);
      console.log(featuredRestaurant);

      SetLoading(false)
    })();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      {loading ? (
          <Loader text={" please wait ..."}/> 
        ):(<p></p>)}

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Users</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{countU}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Restaurants</h3>
            <BsBuilding className="card_icon" />
          </div>
          <h1>{countR}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Featured Restaurants</h3>
            <BsBuildingFill className="card_icon" />
          </div>
          <h1>{countF}</h1>
        </div>
      </div>
      <div className="userTable">
        <h1 className="tHeading">Users</h1>
        {userData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {userData.slice(0, 5).map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No user Data available</p>
        )}
      </div>
      <div>
        <h1 className="t2Heading">Restaurants</h1>
        {restaurantData.length > 0 ? (
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
              {restaurantData.map((user, index) => (
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
