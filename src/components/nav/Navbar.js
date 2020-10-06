import React from "react";
import { Link, NavLink } from "react-router-dom";
import LOGO from "../../assets/LogoProject.png";
import "../../App.css";
import { connect } from 'react-redux';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <Link to="/">
          <img src={LOGO} alt="logo" className="logo" />
        </Link>
        <ul>
          <li>
            <NavLink to="./">Déconnexion</NavLink>
          </li>
          <li>
            <NavLink to="./myaccount">Mon compte</NavLink>
          </li>
          {/* <li>
            <NavLink to="./signin">Log in</NavLink>
          </li>           */}

          {/*<li><NavLink to='./inforesto'>Ma carte en ligne</NavLink></li>
        <li><NavLink to='./inforesto'>Modifier ma carte</NavLink></li> */}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {

  }
}
export default connect(mapStateToProps)(Navbar);
