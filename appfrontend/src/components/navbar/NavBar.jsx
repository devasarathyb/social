import React, { useContext, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContextProvider";

const NavBar = () => {
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (currentUser.length === 0) {
      navigate("/login");
    }
  };

  console.log(currentUser, "curr");
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Wanna Chat!</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <HomeOutlinedIcon />
        </Link>
        {darkMode ? (
          <LightModeOutlinedIcon onClick={toggleDarkMode} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggleDarkMode} />
        )}
        <AppsOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search.." />
        </div>
      </div>
      <div className="right">
        <MarkEmailUnreadOutlinedIcon />
        <NotificationsActiveOutlinedIcon />
        <LogoutOutlinedIcon onClick={handleLogout} />

        <div className="user">
          <img src={"/upload/" + currentUser.profilepic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
