import React, { Component } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Header from "../../assets/landingPage/illustration-header.png";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  signIn,
  signInWithGoogle,
  signInWithFacebook,
  sendPasswordReset,
} from "../../store/actions/authActions";
import PropTypes from "prop-types";
import HomeTopBar from "../landingPage/HomeTopBar";
import SocialSignIn from "./SocialSignIn";
import { toast } from "react-toastify";


const styles = (theme) => ({
  root: {},
  header: {
    alignItems: "center",
    margin: "3rem",
  },
  logo: {
    width: "70%",
    marginTop: "1rem",
    marginLeft: "15%",
  },
  form: {
    width: "80%",
    marginLeft: "10%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    margin: "1rem",
  },
  instruction: {
    display: "flex",
    margin: "1rem",
  },
  createAccountLink: {
    marginLeft: "0.5rem",
  },
  separation: {
    textAlign: "center",
    marginTop: "1.5rem",
  },
  connectionButton: {
    width: "100%",
    marginTop: "2rem",
    position: "right",
    backgroundColor: "#E81B7D",
    color: theme.palette.primary.whiteish,
  },
  forgotPassword: {
    marginTop: "2rem",
    marginLeft: "45%",
    width: "11rem",
    fontSize: "0.8rem",
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
    toast.info(`Un email contenant un lien de réinitialisation du mot de passe vous a été envoyé à ${this.state.email}`, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  render() {
    const { classes, authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;
    console.log(this.state);

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <HomeTopBar />
          <Link to="/">
            <img src={Header} alt="logo" className={classes.logo} />
          </Link>
        </div>

        <Typography variant="h1" className={classes.title}>
          Connectez-vous
        </Typography>
        <div className={classes.instruction}>
          <Typography variant="body2">
            Vous êtes un nouvel utilisateur ?{" "}
          </Typography>
          <Link to="./createaccount">
            <Typography variant="body1" className={classes.createAccountLink}>
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
