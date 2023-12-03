import React from "react";
import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../api/internal";
import { resetUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from'../CSS/Navbar.module.css'
export const Navbar=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const isAuthenticated= useSelector((state) =>state.user.auth)
    const name=useSelector((state)=> state.user.name)
    let links=[
        {name:"Home",to:"/"},
        {name:"Favorites",to:"/favorites"},
        {name:"Bookings",to:"/NewBooking"},
        {name:"New Booking",to:"/booking"},
        {name:"Profile",to:"/profile"},
    ];
    const handleLogout= async()=>{
        await signout();
        dispatch(resetUser())

      


    }
    return(
        
        <div className="shadow-md w-full fixed top-0
         left-0">
            <div className="md:flex sm: items-center justify-between  bg-black py-4 md:px-10 px-7" >
                <Link className="text-blue-500 text-xl" to={'/'}>
         Food Meter</Link>
            <ul className="md:flex md:items-center justify-center "> 
            {
                links.map((link)=>(
                    <li key={link.name} className="md:ml-10 text-xl text-black hover:text-blue-500 flex space-x-4">
                        <NavLink to={link.to}  className="text-white hover:text-blue-500 flex space-x-4" 
                activeClassName="text-blue-500" >{link.name}</NavLink>
                    </li>
                ))
            }
         </ul>
         <p className="text-white ml-10">Welcome  {name}</p>
         <button onClick={handleLogout} className="ml-3 bg-transparent hover:bg-red-500 text-white  rounded w-35 h-15 border-2 border-red-500  p-2">
          Log out
        </button>
         
         </div>

        </div>
   

        
    )
};