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
import HomeFooter from "../landingPage/HomeFooter";
import { toast } from "react-toastify";


const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
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
    [theme.breakpoints.up("md")]: {
      width: "3%",
      margin: "1rem",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginTop: "4rem",
    width: "100%",
    backgroundColor: "grey",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  headerImg: {
    width: "70%",
    marginTop: "1rem",
    marginLeft: "15%",
    [theme.breakpoints.up("md")]: {
      marginLeft: "20%",
    },
  },
  form: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  title: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    marginLeft: "1.5rem",
    marginTop: "2rem",
    fontColor: "#192b34",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "20%",
      fontSize: "4rem",
      marginBottom: "4rem",
    },
  },
  spanTitle: {
    color: "#E81B7D",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    marginLeft: "15%",
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      marginLeft: "35%",
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
      width: "20%",
      marginLeft: "40%",
    },
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
  },
});

class SignUp extends Component {
  state = {
    lastName: "",
    firstName: "",
    email: "",
    siret: "",
    password: "",
    passwordConfirm: "",
    cguAccepted: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.passwordConfirm){
    this.props.signUp(this.state);
    } else {
      toast.error("mot de passe incorrect", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
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
                label="votre nom"
                onChange={this.handleChange}
                required
              />
              <TextField
                id="firstName"
                type="text"
                label="votre prénom"
                onChange={this.handleChange}
                required
              />
              <TextField
                id="email"
                type="email"
                label="email d'inscription"
                onChange={this.handleChange}
                required
              />
              <TextField
                id="siret"
                type="number"
                label="numéro SIRET"
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
              <TextField
                id="passwordConfirm"
                type="passwordConfirm"
                label="confirmer le mot de passe"
                onChange={this.handleChange}
                // className={classes.passwordInput}
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
        <HomeFooter />
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
