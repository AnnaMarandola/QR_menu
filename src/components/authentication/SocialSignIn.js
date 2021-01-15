import React, { Component } from "react";
import {  Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "../../store/actions/authActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  googleButton: {
    marginBottom: "1rem",
    backgroundColor: "white",
    marginTop: "2rem",
    border: "solid 3px white",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    }
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

class SocialSignIn extends Component {
  state = {
    email: "",
    password: "",
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
    const { classes, auth } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;

    return (
      <div className={classes.root}>
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
    signInWithGoogle: (creds) => dispatch(signInWithGoogle(creds)),
    signInWithFacebook: (creds) => dispatch(signInWithFacebook(creds)),
  };
};

SocialSignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  authError: PropTypes.string,
  auth: PropTypes.object,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SocialSignIn);
