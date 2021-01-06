import { Button, Typography, withStyles } from "@material-ui/core";
import { compose } from "redux";
import React from "react";
import { NavLink } from "react-router-dom";
import PROJECT from "../../assets/workInProgress/project-page.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    jutifyContent: "center",
    marginTop: "6rem",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginTop: "10rem",
    },
  },
  links: {
    textDecoration: "none",
  },
  illustrationSection: {
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  textSection: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
    marginLeft: "10%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0%",
      width: "40%",
      paddingRight: "10%",
    },
  },
  illustration: {
    width: "100%",
  },
  title: {
    marginBottom: "3rem",
    fontFamily: "Archivo narrow",
    fontSize: "2.5rem",
    marginTop: "2rem",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: "5rem",
      fontSize: "4rem",
      margin: 0,
    },
  },
  titleSpan: {
    color: "#ee1c80",
  },
  subtitle: {
    fontFamily: "Archivo narrow",
    marginBottom: "4rem",
    fontSize: "1.5rem",
    fontWeight: "300",
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "#ee1c80",
    color: "white",
    width: "10rem",
    height: "3rem",
    fontSize: "1rem",
  },
});

const ProjectPage = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.illustrationSection}>
        <img
          src={PROJECT}
          alt="work in progress illustration"
          className={classes.illustration}
        />
      </div>

      <div className={classes.textSection}>
        <Typography className={classes.title}>
          <span className={classes.titleSpan}>En cours</span> de construction...
        </Typography>
        <Typography className={classes.subtitle}>
          Notre application de référencement sera disponible très prochainement !
        </Typography>
        <NavLink to="./" className={classes.links}>
          <Button className={classes.goBackButton}>Acceuil</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default compose(withStyles(styles))(ProjectPage);
