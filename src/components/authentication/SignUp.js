import React, { Component } from "react";
import { Typography, TextField, Button, FormControlLabel, Checkbox} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Logo from "../../assets/LogoProject.png";
import Handphone from "../../assets/handphone.png";

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
    lastname: "",
    firstname: "",
    city: "",
    postalCode: null,
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
    console.log(this.state);
  };
  acceptCGU = (e) => {
    this.setState({
      cguAccepted: true,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <img src={Logo} alt="logo" className={classes.logo} />
          <img src={Handphone} alt="icon qrcode" className={classes.iconQr} />
        </div>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Typography variant="h1">Créez votre compte</Typography>

          <div className={classes.inputs}>
            <TextField id="name" label="nom" onChange={this.handleChange} />
            <TextField
              id="firstname"
              label="prénom"
              onChange={this.handleChange}
            />
            <TextField id="email" label="email" onChange={this.handleChange} />
            <TextField id="city" label="ville" onChange={this.handleChange} />
            <TextField
              id="postcode"
              label="code postal"
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              label="choisir un mot de passe"
              onChange={this.handleChange}
              className={classes.passwordInput}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.cguAccepted}
                  onChange={this.acceptCGU}
                  name="checkedA"
                />
              }
              label="j'ai lu et j'accepte les CGU."
            />
          </div>

          <div className={classes.buttonsContainer}>
            <Button variant="contained" className={classes.connectionButton}>
              valider
            </Button>
            <Typography variant="h5" className={classes.separation}>
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
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);
