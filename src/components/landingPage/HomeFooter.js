import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright(classes) {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://qrmenu-64802.firebaseapp.com/">
        QR Menu
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    height: "5rem",
    backgroundColor: "white",
  },
  copyright: {
    marginTop: "1rem",
  },
}));

function HomeFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm" className={classes.copyright}>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default HomeFooter;
