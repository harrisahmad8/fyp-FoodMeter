import React, { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeFeatured } from '../api/internal'


export const Success=()=> {

    const navigate=useNavigate()
    const name = useSelector((state) => state?.user?.name );
   
    const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log("storedUser*",storedUser)
  const userName = user ? user.name : null;
  console.log("user1***",userName)
  const [featured,SetFeatured]=useState()
    

    useEffect(() => {
      (async function fetchData() {
       
       const getUser = await makeFeatured(userName);
       if (getUser.status === 200) {
         SetFeatured(getUser.data.restaurant);
         alert("Your restaurant is featured succesfully")
       }
     })();
    }, []);
    return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <p style={{color:"green", fontSize:"20px"}}>Payment successful</p>
    <button
      onClick={() => navigate("/restaurantDashboard", { state: { restaurant: name } })}
      className='h-15 w-20 bg-blue-500 mt-10'
    >
      Done
    </button>
  </div>
);
}

