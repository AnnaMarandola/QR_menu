import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logoIcon.png";
import "../../App.css";
import { connect } from "react-redux";
import MyMenu from "../nav/MyMenu";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";

const styles = (theme) => ({
  navbar: {
    width: "100%",
    height: "4rem",
    backgroundColor: "white",
    position: "fixed",
    zIndex: 2,
  },
  logo: {
    width: "50px",
    marginTop: "0.5rem",
    marginLeft: "0.5rem",
  }
});

const Navbar = (props) => {
  const { auth, history, classes } = props;
  console.log("authUid", auth.uid);
  return (
    <nav className={classes.navbar}>
        <Link to="/">
          <img src={LOGO} alt="logo" className={classes.logo} />
        </Link>
        {auth.uid ? 
        <div className={classes.menu}>
        <MyMenu history={history} />
        </div>
         : null}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps), withStyles(styles))(Navbar);
