import React from "react";
import {
  withStyles,
  Typography,
  Card,
} from "@material-ui/core";
import { compose } from "redux";
import PHONEBG from "../../../assets/smartphoneBG.png";


const styles = (theme, menu) => ({
  root: {
    backgroungColor: "#11ffee00",
    backgroundImage: `url(${PHONEBG})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "relative",
    top: 0,
    width: "50%",
    minWidth: 350,
    height: "60%",
    marginLeft: "20%",
    marginTop: "2rem",
    padding: "1rem",
  },
  header: {
    // height: "19rem",
    minHeight: "fit-content",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  restoName: {
    paddingTop: "2rem",
  },
  logo: {
    marginTop: "2rem",
    maxWidth: "5rem",
  },

});

const DemoMobile = ({
  classes,
  restaurant,
  menu,
}) => {
  let resto = { ...restaurant };


  return (
    <div className={classes.root}>

        <div
          className={classes.header}
          style={{ backgroundColor: (menu && menu.headerColor) }}
        >
          <Typography
            className={classes.restoName}
            style={{
              color: (menu && menu.fontColor),
              fontFamily: (menu && menu.fontFamily),
              fontSize: menu && menu.fontSize,
            }}
          >
            {resto.name}
          </Typography>
          <img
            className={classes.logo}
            src={resto.logo}
            alt="logo"
            style={{
              width: menu && menu.logoSize,
            }}
          />
        </div>

   </div>
  );
};


export default compose(
  withStyles(styles),
)(DemoMobile);
