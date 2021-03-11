import React, { Component } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { Link, Redirect, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import HEADER from "../../assets/landingPage/illustration-header.png";
import LOGO from "../../assets/logoIcon.png";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  signIn,
  signInWithGoogle,
  signInWithFacebook,
  sendPasswordReset,
} from "../../store/actions/authActions";
import PropTypes from "prop-types";
import SocialSignIn from "./SocialSignIn";
import { toast } from "react-toastify";
import HomeFooter from "../landingPage/HomeFooter";

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      height: "100vh",
    },
  },
  logo: {
    width: "10%",
    marginTop: "0.5rem",
    marginRight: "0.5rem",
    position: "absolute",
    right: "0",
    [theme.breakpoints.up("sm")]: {
      width: "3%",
      margin: "1rem",
    },
  },
  header: {
    alignItems: "center",
    paddingTop: "4rem",
    [theme.breakpoints.up("sm")]: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "40%",
    },
  },
  headerImg: {
    width: "70%",
    marginTop: "1rem",
    marginLeft: "15%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      marginLeft: "10%",
    },
  },
  formContainer: {
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  form: {
    width: "80%",
    marginLeft: "10%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      marginLeft: "35%",
    },
  },
  title: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    margin: "1rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "25%",
      fontSize: "4rem",
      marginBottom: "4rem",
    },
  },
  spanTitle: {
    color: "#f5564e",
  },
  instruction: {
    display: "flex",
    margin: "1rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "26%",
      marginBottom: "6rem",
    },
  },
  createAccountLink: {
    marginLeft: "0.5rem",
    color: "#f5564e",
  },
  separation: {
    textAlign: "center",
    marginTop: "1.5rem",
    [theme.breakpoints.up("sm")]: {},
  },
  connectionButton: {
    width: "100%",
    marginTop: "2rem",
    marginBottom: "2rem",
    position: "right",
    backgroundColor: "#f5564e",
    color: theme.palette.primary.whiteish,
    [theme.breakpoints.up("sm")]: {
      width: "40%",
      marginLeft: "30%",
    },
  },
  forgotPassword: {
    marginTop: "2rem",
    marginLeft: "45%",
    width: "11rem",
    fontSize: "0.8rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "70%",
    },
  },
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  handleGoogleAuth = (e) => {
    e.preventDefault();
    this.props.signInWithGoogle();
  };

  handleFacebookAuth = (e) => {
    e.preventDefault();
    this.props.signInWithFacebook();
  };

  handleForgotPassword = (e) => {
    e.preventDefault();
    this.props.sendPasswordReset(this.state);
    toast.info(
      `Un email contenant un lien de réinitialisation du mot de passe vous a été envoyé à ${this.state.email}`,
      {
        position: toast.POSITION.TOP_LEFT,
      }
    );
  };

  render() {
    const { classes, authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;
    console.log(this.state);

    return (
      <div>
        <NavLink to="/">
          <img className={classes.logo} src={LOGO} alt="logo back to home" />
        </NavLink>

        <div className={classes.root}>
          <div className={classes.header}>
            <Link to="/">
              <img src={HEADER} alt="logo" className={classes.headerImg} />
            </Link>
          </div>
          <div className={classes.formContainer}>
            <Typography variant="h1" className={classes.title}>
              <span className={classes.spanTitle}>C</span>onnectez-vous
            </Typography>
            <div className={classes.instruction}>
              <Typography variant="body2">
                Vous êtes un nouvel utilisateur ?{" "}
              </Typography>
              <Link to="./createaccount">
                <Typography
                  variant="body1"
                  className={classes.createAccountLink}
                >
                  Créez un compte
                </Typography>
              </Link>
            </div>

            <div>
              <SocialSignIn />
              <Typography variant="h5" className={classes.separation}>
                ou
              </Typography>
            </div>

            <form onSubmit={this.handleSubmit} className={classes.form}>
              <TextField
                id="email"
                type="email"
                label="email"
                onChange={this.handleChange}
                required
              />
              <TextField
                id="password"
                type="password"
                label="mot de passe"
                onChange={this.handleChange}
              />
              {authError ? <Typography>{authError}</Typography> : null}
              <Button
                className={classes.forgotPassword}
                onClick={this.handleForgotPassword}
              >
                Mot de passe oublié ?
              </Button>
              <div className={classes.buttonsContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.connectionButton}
                >
                  connexion
                </Button>
              </div>
            </form>
          </div>
        </div>
        <HomeFooter/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signInWithGoogle: (creds) => dispatch(signInWithGoogle(creds)),
    signInWithFacebook: (creds) => dispatch(signInWithFacebook(creds)),
    sendPasswordReset: (creds) => dispatch(sendPasswordReset(creds)),
  };
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  authError: PropTypes.string,
  auth: PropTypes.object,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SignIn);
