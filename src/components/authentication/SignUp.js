import React, { Component } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import HEADER from "../../assets/landingPage/illustration-header.png";
import LOGO from "../../assets/logoIcon.png";
import { NavLink, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "red",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
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
      left: "0",
      width: "3%",
      margin: "1rem",
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "4rem",
    // backgroundColor: "blue",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginTop: 0,
      height: "100%",
    },
  },
  headerImg: {
    width: "70%",
    marginTop: "1rem",
    marginLeft: "15%",
    // backgroundColor: "pink",
    [theme.breakpoints.up("sm")]: {
      width: "120%",
      marginLeft: "45%",
    },
  },
  form: {
    width: "100%",
    // backgroundColor: "yellow",
    [theme.breakpoints.up("sm")]: {
      height: "100%",
      width: "80%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#83e4fa",
    },
  },
  title: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    marginLeft: "1.5rem",
    marginTop: "2rem",
    fontColor: "#192b34",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "7rem",
      fontSize: "4rem",
    },
  },
  spanTitle: {
    color: "#E81B7D",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    marginLeft: "10%",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      marginLeft: "20%",
      marginBottom: "2rem",
      marginTop: "2rem",
    },
  },
  connectionButton: {
    marginTop: "2rem",
    position: "right",
    backgroundColor: "#E81B7D",
    color: theme.palette.primary.whiteish,
    width: "80%",
    marginLeft: "10%",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
      marginLeft: "30%",
    },
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
    [theme.breakpoints.up("sm")]: {},
  },
});

class SignUp extends Component {
  state = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    cguAccepted: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  acceptCGU = (e) => {
    this.setState({
      cguAccepted: true,
    });
  };

  render() {
    const { classes, auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/inforesto/add" />;

    return (
      <div>
        <NavLink to="/">
          <img className={classes.logo} src={LOGO} alt="logo back to home" />
        </NavLink>

        <div className={classes.root}>
          <div className={classes.header}>
            <NavLink to="/">
              <img
                src={HEADER}
                alt="header illustration"
                className={classes.headerImg}
              />
            </NavLink>
          </div>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Typography variant="h1" className={classes.title}>
              <span className={classes.spanTitle}>C</span>réez votre compte
            </Typography>

            <div className={classes.inputs}>
              <TextField
                id="lastName"
                type="text"
                label="nom"
                onChange={this.handleChange}
                required
              />
              <TextField
                id="firstName"
                type="text"
                label="prénom"
                onChange={this.handleChange}
                required
              />
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
                label="choisir un mot de passe"
                onChange={this.handleChange}
                className={classes.passwordInput}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="cguAccepted"
                    checked={this.cguAccepted}
                    type="checkbox"
                    onChange={this.acceptCGU}
                    name="checkedA"
                  />
                }
                label="j'ai lu et j'accepte les CGU."
              />
              {authError ? <Typography>{authError}</Typography> : null}
            </div>

            <div className={classes.buttonsContainer}>
              <Button
                variant="contained"
                type="submit"
                className={classes.connectionButton}
              >
                valider
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);
