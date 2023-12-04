import React from "react";
import {  Routes, Route } from "react-router-dom";
import { AdminStatistics } from "./adminStatistics";
import { AdminRestaurant } from "./adminRestaurant";
import { AdminUser } from "./adminUser";
import { Dashboard } from "./dashboard";

export const Admin = () => {
  return (
    <div>
     
        <Routes>
          <Route path="/" element={<Dashboard />}/>
            
          <Route path="/user" element={<AdminUser/>}/>
            
          <Route path="/restaurant" element={<AdminRestaurant/>}/>
            
          <Route path="/statistics" element={<AdminStatistics/>}/>
        </Routes>
      
    </div>
  );
};
