import { Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import logo from "../../assets/GoogleIcon.png";

const styles = (theme) => ({
    root: {
        width: "100%"
    },
    menuHearder: {
        backgroundColor: theme.palette.primary.red,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logo: {
        maxWidth: "35%",
        marginTop: "2rem",
    },
    restoContact: {
        backgroundColor: theme.palette.primary.red,
        display: "flex",
        paddingTop: "2rem",
        justifyContent: "center",
        paddingBottom: "1rem",

    },
    menuContent: {

    },
    menuTitle: {
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",

    }
});

const MenuPage = ({ classes, restaurant, auth, profile, match }) => {
  console.log("restaurant in menuPage", restaurant);
  console.log("AUTH in menuPage", auth);
  const restoIdinParams = match.params.id
  console.log("params id", restoIdinParams)
  return (
    <div className={classes.root}>
      <div className={classes.menuHearder}>
        <img className={classes.logo} src={logo} alt="logo" />
        <Typography className={classes.restoName} variant="h1">
          Resto name
        </Typography>
      </div>
      <div className={classes.restoContact}>
        <Typography variant="body1"> adress </Typography>
        <Typography variant="body1"> postal code - city </Typography>
        <Typography variant="body1"> phone number </Typography>
        <Typography variant="body1"> email contact </Typography>
        </div>
      <div className={classes.menuContent}>
            <Typography variant="h1" className={classes.menuTitle}>
            Nos salades
            </Typography>
        </div>
      </div>

  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    restaurants: state.firestore.ordered.restaurants,
  };
};

export default compose(withStyles(styles), connect(mapStateToProps))(MenuPage);