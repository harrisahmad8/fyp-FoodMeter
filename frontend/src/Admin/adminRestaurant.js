import React,{useState} from 'react'
import {Header} from './components/header'
import {Sidebar} from './components/sidebar'
import { HomeRestaurant } from './components/homeRestaurant'
import '../CSS/dashboard.css'


export const AdminRestaurant=()=> {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <HomeRestaurant />
    </div>
  )
}