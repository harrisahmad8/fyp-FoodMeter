import React,{useState} from 'react'
import {Header} from './components/header'
import {Sidebar} from './components/sidebar'
import { HomeUser } from './components/homeUser'
import '../CSS/dashboard.css'


export const AdminUser=()=> {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <HomeUser />
    </div>
  )
}