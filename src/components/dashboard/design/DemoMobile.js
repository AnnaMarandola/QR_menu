import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { compose } from "redux";
import PHONEBG from "../../../assets/smartphoneBG.png";
import RestoCarousel from "../../restaurantPage/RestoCarousel";
// import { Scrollbars } from "react-custom-scrollbars-2";

const styles = (theme, menu) => ({
  root: {
    backgroungColor: "#11ffee00",
    // backgroundImage: `url(${PHONEBG})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center center",
    // backgroundSize: "cover",
    position: "relative",
    top: 0,
    width: "50%",
    minWidth: 350,
    height: "60%",
    marginLeft: "25%",
    marginTop: "13rem"
  },
  phoneBg: {
    position: "absolute",
    top: 0,
    width: "50%",
    minWidth: 350,
    height: "auto",
    //   marginLeft: "25%",
    zIndex: 1,
  },
  container: {
    padding: "1rem",
    height: "90%",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  header: {
    minHeight: "fit-content",
    width: "99.5%",
    height: "auto",
    marginLeft: "0.225rem",
    marginTop: "2.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  restoName: {
    paddingTop: "3rem",
  },
  logo: {
    marginTop: "2rem",
    marginBottom: "1rem",
    maxWidth: "9rem",
  },
  carouselSection: {
    width: "99.6%",
    marginLeft: "0.225rem",
  },
  menuTitle: {
    textAlign: "center",
    marginTop: "4rem",
    fontSize: "1.5rem",
  },
});



const DemoMobile = ({ classes, restaurant, menu }) => {
  let resto = { ...restaurant };
  let menuData = { ...menu };

  return (
    <div className={classes.root}>
      <img
        src={PHONEBG}
        alt="smartphone background"
        className={classes.phoneBg}
      />
      <div className={classes.container}>
          <div
            className={classes.header}
            style={{ backgroundColor: menu && menu.headerColor }}
          >
            <Typography
              className={classes.restoName}
              style={{
                color: menu && menu.fontColor,
                fontFamily: menu && menu.fontFamily,
                fontSize: menu && menu.fontSize,
              }}
            >
              {resto.name}
            </Typography>
            {menu && menu.logoSize === "11rem" && (
              <img
                className={classes.logo}
                src={resto.logo}
                alt="logo"
                style={{
                  width: "9rem",
                }}
              />
            )}{" "}
            {menu && menu.logoSize === "9rem" && (
              <img
                className={classes.logo}
                src={resto.logo}
                alt="logo"
                style={{
                  width: "7rem",
                }}
              />
            )}
            {menu && menu.logoSize === "7rem" && (
              <img
                className={classes.logo}
                src={resto.logo}
                alt="logo"
                style={{
                  width: "5rem",
                }}
              />
            )}
          </div>
          <div className={classes.carouselSection}>
            <RestoCarousel restaurant={resto} />
          </div>
          <Typography
            className={classes.menuTitle}
            style={{
              fontFamily: menuData.fontFamily,
            }}
          >
            {menuData.menuTitle}
          </Typography>
          <div className={classes.carouselSection}>
            <RestoCarousel restaurant={resto} />
          </div>
      </div>
    </div>
  );
};

export default compose(withStyles(styles))(DemoMobile);
