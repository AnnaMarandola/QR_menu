import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logoIcon.png";
import "../../App.css";
import { connect } from "react-redux";
import MyMenu from "../nav/MyMenu";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import RestoNav from "./RestoNav";

const styles = (theme) => ({
  navbar: {
    width: "100%",
    backgroundColor: "transparent",
    position: "fixed",
    marginTop: "0.8rem",
    zIndex: 2,
  },
});

const Navbar = ({classes, menu }) => {
  return (
    <nav className={classes.navbar}>
      <RestoNav menu={menu} />
    </nav>
  );
};

export default compose(withStyles(styles))(Navbar);
