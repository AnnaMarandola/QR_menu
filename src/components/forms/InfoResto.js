import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { createRestaurant } from '../../store/actions/restaurantActions';

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "90%",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    marginLeft: "5%",
  },
  validationButton: {
    marginTop: "2rem",
    position: "right",
    backgroundColor: theme.palette.primary.red,
    color: theme.palette.primary.whiteish,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
  },
});

class InfoResto extends Component {
  state = {
    id: null,
    name: "",
    adress: "",
    city: "",
    postalCode: null,
    logo: "",
    facebook: "",
    instagram: "",
    phone: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createRestaurant(this.state)
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Typography variant="h1">
            Informations sur votre établissement
          </Typography>
          <Typography variant="body1">
            Ces informations seront disponibles sur votre page.{" "}
          </Typography>

          <div className={classes.inputs}>
            <TextField id="name" label="nom de l'établisement" onChange={this.handleChange}/>
            <TextField id="adress" label="adresse" onChange={this.handleChange}/>
            <TextField id="city" label="ville" onChange={this.handleChange}/>
            <TextField id="postalCode" label="code postal" onChange={this.handleChange}/>
            <TextField id="phone" label="numéro de téléphone" onChange={this.handleChange}/>
            <TextField id="logo" label="votre logo" onChange={this.handleChange}/>
            <TextField id="instagram" label="votre instagram" onChange={this.handleChange}/>
            <TextField id="facebook" label="votre facebook" onChange={this.handleChange}/>
          </div>

          <div className={classes.buttonsContainer}>
            <Button variant="contained" className={classes.validationButton} onClick={this.handleSubmit}>
              valider
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRestaurant: (restaurant) => dispatch(createRestaurant(restaurant))
  };
};

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(InfoResto);
