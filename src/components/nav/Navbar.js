import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/LogoProject.png";
import '../../App.css';


const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <Link to="/">
          <img src={LOGO} alt="logo" className="logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
