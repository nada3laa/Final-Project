import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt, UilEstate, UilClipboardAlt, UilUsersAlt, UilPackage, UilChart, UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const SidebarData = [
  { icon: UilEstate, heading: "Dashboard", path: "/admin" },
  { icon: UilClipboardAlt, heading: "Orders", path: "/OrdersManagement" },
  { icon: UilUsersAlt, heading: "Customers", path: "/CustomerManagement" },
  { icon: UilPackage, heading: "Products", path: "/AdminProducts" },
  { icon: UilChart, heading: "Analytics", path: "/Analytics" },
];

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const sidebarVariants = {
    true: { left: '0' },
    false: { left: '-60%' }
  };

  // Function to handle "Back Home" navigation
  const handleBackHome = () => {
    navigate('/'); // Navigate to the home page route ("/")
  };

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar' variants={sidebarVariants} animate={window.innerWidth <= 768 ? `${expanded}` : ''}>
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <Link to={item.path} key={index} onClick={() => setSelected(index)} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={selected === index ? "menuItem active" : "menuItem"}>
                  <item.icon />
                  <span>{item.heading}</span>
                </div>
              </Link>
            );
          })}
          {/* Back Home Button */}
          <div className="menuItem" onClick={handleBackHome}>
            <UilSignOutAlt />
            <span>Back Home</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
