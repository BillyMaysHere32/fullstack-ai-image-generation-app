import React from 'react'
import { BsPlus, BsGearFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <div className="sticky top-0 left-0 h-screen md:p-6 p-2 flex flex-col
                 bg-gray-900 shadow-lg">
                    
        <Link to="/">
            <SideBarIcon icon={<FiHome size="36" />} text="Home" />
        </Link>
        <Divider />
        <Link to="/create-post">
        <SideBarIcon icon={<BsPlus size="60" />} text="Create a post."/>
        </Link>
        <Link to="/contact">
        <SideBarIcon icon={<FaUserAlt size="36" />} text="Contact"/>
        </Link>
        <Divider />
        <Link to="/about">
        <SideBarIcon icon={<BsGearFill size="36" />} text="About"/>
        </Link>
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;