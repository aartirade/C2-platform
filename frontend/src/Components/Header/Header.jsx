import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  ContactMail,
  ContactMailOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
  AccountBalance,
  AccountBalanceOutlined,
} from "@mui/icons-material";

import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <div className="headerr">
        <div className="b1">
          <img src="\images\logo.png" alt="img" className="logo1" />
          <img src="\images\logo-name.png" alt="img" className="logo2" />
        </div>
        <div className="b2">
          <Link to="/home" onClick={() => setTab("/home")}>
            {tab === "/home" ? (
              <Home style={{ color: "white" }} />
            ) : (
              <HomeOutlined />
            )}
          </Link>

          <Link to="/newpost" onClick={() => setTab("/newpost")}>
            {tab === "/newpost" ? (
              <Add style={{ color: "white" }} />
            ) : (
              <AddOutlined />
            )}
          </Link>

          <Link to="/search" onClick={() => setTab("/search")}>
            {tab === "/search" ? (
              <Search style={{ color: "white" }} />
            ) : (
              <SearchOutlined />
            )}
          </Link>

          <Link to="/account" onClick={() => setTab("/account")}>
            {tab === "/account" ? (
              <AccountCircle style={{ color: "white" }} />
            ) : (
              <AccountCircleOutlined />
            )}
          </Link>

          <Link
            to={`/dashboard/${user.instituteCode}`}
            onClick={() => setTab(`/dashboard/${user.instituteCode}`)}
          >
            {tab === `/dashboard/${user.instituteCode}` ? (
              <AccountBalance style={{ color: "white" }} />
            ) : (
              <AccountBalanceOutlined />
            )}
          </Link>

          <Link to={`/aboutus`} onClick={() => setTab(`/aboutus`)}>
            {tab === `/aboutus` ? (
              <ContactMail style={{ color: "white" }} />
            ) : (
              <ContactMailOutlined />
            )}
          </Link>
        </div>
        <div className="b3">
          <Typography style={{ color: "white" }} className="usertext">
            Welcome, {user.name}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Header;
