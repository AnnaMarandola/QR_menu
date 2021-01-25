import React from "react";
import "../../App.css";
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
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const Navbar = ({classes, menu }) => {
  return (
    <nav className={classes.navbar}>
    <div className={classes.container}>
      <RestoNav menu={menu} />
      </div>
    </nav>
  );
};

export default compose(withStyles(styles))(Navbar);
