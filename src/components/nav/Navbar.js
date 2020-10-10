import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/LogoProject.png";
import "../../App.css";
import { connect } from "react-redux";
import MyMenu from '../nav/MyMenu';

const Navbar = (props) => {
  const { auth } = props;
  const isLogged = auth.uid ? <MyMenu/> : null
  console.log('authUid', auth.uid);
  return (
    <nav>
      <div className="navbar">
        <Link to="/">
          <img src={LOGO} alt="logo" className="logo" />
        </Link>
    { isLogged  }
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};



export default connect(mapStateToProps)(Navbar);
