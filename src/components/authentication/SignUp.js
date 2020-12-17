import React, { Component } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Logo from "../../assets/LogoProject.png";
import Handphone from "../../assets/handphone.png";
import { Redirect } from "react-router-dom";
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
    width: "50%",
    marginTop: "2rem",
  },
  iconQr: {
    width: "20%",
    marginTop: "2rem",
  },
  form: {
    width: "90%",
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
    margin: "1.5rem",
  },
  connectionButton: {
    marginTop: "2rem",
    position: "right",
    backgroundColor: theme.palette.primary.red,
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
          <img src={Logo} alt="logo" className={classes.logo} />
          <img src={Handphone} alt="icon qrcode" className={classes.iconQr} />
        </div>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Typography variant="h1">Créez votre compte</Typography>

          <div className={classes.inputs}>
            <TextField
              id="lastName"
              type="text"
              label="nom"
              onChange={this.handleChange}
            />
            <TextField
              id="firstName"
              type="text"
              label="prénom"
              onChange={this.handleChange}
            />
            <TextField
              id="email"
              type="email"
              label="email"
              onChange={this.handleChange}
            />

            <TextField
              id="password"
              type="password"
              label="choisir un mot de passe"
              onChange={this.handleChange}
              className={classes.passwordInput}
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
            <Button variant="contained" type="submit" className={classes.connectionButton}>
              valider
            </Button>
            {/* <Typography variant="h5" className={classes.separation}>
              ou
            </Typography>
            <Button variant="contained" className={classes.googleButton}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo google"
                className={classes.googleIcon}
              />
              utiliser mon compte Google
            </Button>
            <Button variant="contained" className={classes.facebookButton}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Facebook_logo_36x36.svg"
                alt="logo facebook"
                className={classes.facebookIcon}
              />
              utiliser mon compte facebook
            </Button> */}
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
