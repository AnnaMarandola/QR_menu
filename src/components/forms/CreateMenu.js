import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { createMenu } from "../../store/actions/menuActions";
// import { Redirect } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  validationButton: {
    marginTop: "2rem",
    position: "right",
    backgroundColor: theme.palette.primary.red,
    color: theme.palette.primary.whiteish,
  },

});

class CreateMenu extends Component {
  state = {
    restoId: this.props.restaurant.id,
    template: this.props.restaurant.template,
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createMenu(this.state);
    console.log('menu created', this.state)
  };

  render() {
    const { classes, auth, restaurant } = this.props;
    console.log("auth uid", auth.uid);
    console.log("restaurant.id in createmenu", restaurant.id);

    return (
      <div className={classes.root}>
          <Typography variant="h1">
            Aucun plat enregistrés dans votre carte.
          </Typography>
            <Button
              variant="contained"
              type="submit"
              className={classes.validationButton}
              onClick={this.handleSubmit}
            >
              Commencez
            </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createMenu: (menu) => dispatch(createMenu(menu)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateMenu);
