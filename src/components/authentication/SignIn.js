import React, { Component } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Header from "../../assets/landingPage/illustration-header.png";
import { connect } from "react-redux";
import { compose } from "redux";
import { signIn, signInWithGoogle, signInWithFacebook } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import HomeTopBar from "../landingPage/HomeTopBar";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "3rem",
  },
  logo: {
    width: "70%",
    marginTop: "1rem",
    marginLeft: "15%",
  },
  form: {
    width: "90%",
  },
  title: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
  },
  instruction: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  createAccountLink: {
    marginLeft: "0.5rem",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    marginLeft: "5%",
  },
  separation: {
    textAlign: "center",
    marginTop: "1.5rem",
  },
  connectionButton: {
    marginTop: "2rem",
    position: "right",
    backgroundColor: "#E81B7D",
    color: theme.palette.primary.whiteish,
  },
  googleButton: {
    marginBottom: "1rem",
    backgroundColor: "white",
    marginTop: "2rem",

  },
  facebookButton: {
    backgroundColor: "#3B5997",
    color: theme.palette.primary.whiteish,
  },
  googleIcon: {
    width: "20px",
    marginRight: "2rem",
  },
  facebookIcon: {
    width: "20px",
    marginRight: "1.5rem",
    marginBottom: "0.5rem",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
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

  render() {
    const { classes, authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <HomeTopBar />
          <Link to="/">
            <img src={Header} alt="logo" className={classes.logo} />
          </Link>
        </div>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Typography variant="h1" className={classes.title}>Connectez-vous</Typography>
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
          <div className={classes.inputs}>
          <Button
              variant="contained"
              className={classes.googleButton}
              onClick={this.handleGoogleAuth}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo google"
                className={classes.googleIcon}
              />
              s'identifier avec Google
            </Button>
            <Button 
            variant="contained" 
            className={classes.facebookButton}
            onClick={this.handleFacebookAuth}

            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Facebook_logo_36x36.svg"
                alt="logo facebook"
                className={classes.facebookIcon}
              />
              s'identifier avec facebook
            </Button>
            <Typography variant="h5" className={classes.separation}>
              ou
            </Typography>

            <TextField
              id="email"
              type="email"
              label="email"
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              type="password"
              label="mot de passe"
              onChange={this.handleChange}
            />
            {authError ? <Typography>{authError}</Typography> : null}
          </div>
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
