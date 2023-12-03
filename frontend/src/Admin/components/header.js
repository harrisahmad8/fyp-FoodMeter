
import React from 'react'
import {useState,useEffect,useRef} from 'react';
import 
 {  BsJustify}
 from 'react-icons/bs'

export const Header=({OpenSidebar})=> {


  

const handleLogout=()=>{

}

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        
        <div className='header-right'>
        <div className='user-icon'>
          
            <button className='logButton' onClick={handleLogout}>Logout</button>
            {/* Add more dropdown menu items as needed */}
          </div>
      
            
        </div>
    </header>
  
  )
}
