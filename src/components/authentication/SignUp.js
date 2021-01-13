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
import { NavLink, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

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
  instruction: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  title: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
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
    margin: "1.5rem",
  },
  connectionButton: {
    marginTop: "2rem",
    position: "right",
    backgroundColor: "#E81B7D",
    color: theme.palette.primary.whiteish,
  },
  googleButton: {
    marginBottom: "1rem",
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
      <div className={classes.root}>
        <div className={classes.header}>
          <NavLink to="/">
            <img src={HEADER} alt="header illustration" className={classes.logo} />
          </NavLink>
        </div>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Typography variant="h1" className={classes.title}>Créez votre compte</Typography>

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
