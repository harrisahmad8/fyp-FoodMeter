import "./App.css";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from "./Pages/signup";
import { Login } from "./Pages/Login";
import { Favorites } from "./Pages/favorites";
import { Profile } from "./Pages/profile";
import { HomePage } from "./Pages/HomePage";
import { Booking } from "./Pages/bookings";
import { Mybookings } from "./Pages/myBookings";
import {Protected} from "./Components/Protected/Protected";
import { Error } from "./Pages/Error/Error";
import { ReviewPortal } from "./Pages/reviewPortal";
import { Search } from "./Pages/search";
import { useSelector } from "react-redux";
import { useAutoLogin } from "./Components/hooks/useAutoLogin";
import { Loader } from "./Components/Loader/Loader";
import {Dashboard} from "./Admin/dashboard"
import { Admin } from "./Admin/Admin";
import { RestaurantDashboard } from "./Restaurant/restaurantDashboard";



function App() {
  const isAuth = useSelector((state) => state.user.auth);
  const loading=useAutoLogin();

  return loading ? (
    <Loader text="please wait..."/>):(
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" exact element={<Protected isAuth={isAuth}><HomePage/></Protected>}  />
        <Route path="/login" exact element={< Login/>} />
         
          <Route path="/search" element={<Protected isAuth={isAuth}><Search/></Protected>} />


          <Route path="/register" exact element={< SignUp/>}/>
          

          <Route path="/profile" exact element={<Protected isAuth={isAuth}><Profile /></Protected>} />

          <Route path="/favorites" exact element={<Protected isAuth={isAuth}><Favorites /></Protected>} />

          <Route path="/booking" exact element={<Protected isAuth={isAuth}><Mybookings/></Protected> }/>
          <Route path="/NewBooking" exact element={<Protected isAuth={isAuth}><Booking/> </Protected>}/>
          <Route path="/ReviewPortal" exact element={<Protected isAuth={isAuth}><ReviewPortal/></Protected>}/>
          <Route path="/admin/*" exact element={<Protected isAuth={isAuth}><Admin/></Protected>}/>
          <Route path="/restaurantDashboard" exact element={<Protected isAuth={isAuth}><RestaurantDashboard/></Protected>}/>
          <Route path="*" element={<Error/>}/>
      </Routes>
        
    </Router>

    </div>
  );
}

export default App;
