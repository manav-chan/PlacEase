import React from 'react';
import SidebarContent from './SidebarContent';
import './Sidebar.css';
import { Add } from '@mui/icons-material';
function Sidebar() {
  return (
    <div className='Sidebar'>
      {/* <div className='btn'>
        <Add/>
      <button>create space</button>
      </div> */}
        <SidebarContent title="Announcements"/>
        <SidebarContent title="TCS"/>
        <SidebarContent title="Infosys"/>
        <SidebarContent title="Wipro"/>
        <SidebarContent title="Morgan Stanley"/>
    </div>
  )
}

export default Sidebar;
