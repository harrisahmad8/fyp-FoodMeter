import { useState, useEffect } from "react";

import { allUsers } from "../../api/internal";

import { Loader } from "../../Components/Loader/Loader";
export const HomeUser = () => {
  const [userData, setUserData] = useState([]);
  
  
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      const getUser = await allUsers();
      if (getUser.status === 200) {
        setUserData(getUser.data.users);
      }


    SetLoading(false);

      
      

      
    })();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>USERS</h3>
      </div>

      
      <div className="userTable">
      {loading ? (
          <Loader text={" users..."}/> // Display a loading spinner while data is being fetched
        ) :
        userData.length > 0 ? (
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
              {userData.map((user, index) => (
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
      
    </main>
  );
};
