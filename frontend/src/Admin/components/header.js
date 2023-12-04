
import React from 'react'

import { signout } from '../../api/internal';
import { useDispatch } from 'react-redux';
import { resetUser} from '../../store/userSlice';

import 
 {  BsJustify}
 from 'react-icons/bs';

export const Header=({OpenSidebar})=> {
  
    const dispatch=useDispatch();
const handleLogout= async()=>{
    await signout();
    dispatch(resetUser())

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
