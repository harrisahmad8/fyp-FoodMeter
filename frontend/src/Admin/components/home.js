import React from 'react'
import 
{ BsBuilding, BsBuildingFill, BsPeopleFill}
 from 'react-icons/bs'
 

export const Home=()=> {
  const usersData = [
    { name: 'John Doe', email: 'john@example.com', number: '1234567890', role: 'Admin' },
    { name: 'Jane Doe', email: 'jane@example.com', number: '9876543210', role: 'User' },
    // Add more user data as needed
  ];

  const restaurantsData = [
    { name: 'Restaurant 1', rating: 4.5, location: 'City A', featured: true },
    { name: 'Restaurant 2', rating: 3.8, location: 'City B', featured: false },
    
  ];
    
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Users</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Restaurants</h3>
                    <BsBuilding className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Featured Restaurants</h3>
                    <BsBuildingFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            
        </div>
        <div className='userTable'>
          <h1 className='tHeading'>Users</h1>
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
              {usersData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
          <h1 className='t2Heading'>Restaurants</h1>
        <table>
          
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Location</th>
                <th>Featured</th>
              </tr>
            </thead>
            <tbody>
              {restaurantsData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.rating}</td>
                  <td>{user.location}</td>
                  <td>{user.featured}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        
    </main>
  )
}
