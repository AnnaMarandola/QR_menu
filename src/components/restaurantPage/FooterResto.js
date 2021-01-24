import React from "react";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LOGO from "../../assets/logoIcon.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderTop: "1px solid grey",

  },
  copyright: {
    marginBottom: "1rem",
  },
  logo: {
    width: "10%",
    margin: "1rem",
  },
});

function Copyright(classes) {
  return (
    <div>
    
      <Typography variant="body2" color="textSecondary">
        {"Copyright © "}
        <Link color="inherit" href="https://qrmenu-64802.firebaseapp.com/">
          QR Menu
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

const FooterResto = ({ classes }) => {
  return (
    <div className={classes.root}>
          <img src={LOGO} alt="logo" className={classes.logo} />
          <Typography variant="body2" color="textSecondary">
            Page créée avec l'application QRmenu
          </Typography>
        <Container maxWidth="sm" className={classes.copyright}>
          <Copyright />
        </Container>
    </div>
  );
};

export default compose(withStyles(styles))(FooterResto);
