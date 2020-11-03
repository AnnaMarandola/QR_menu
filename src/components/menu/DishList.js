import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
});

class DishList extends Component {

  render() {
    const { classes, title, price, ingredients, description, allergens } = this.props;

    return (
      <div className={classes.root}>
      <hr/>
        <Typography>{title}</Typography>
        <Typography>{ingredients}</Typography>
        <Typography>{description}</Typography>
        <Typography>{allergens}</Typography>
        <Typography>{price}</Typography>
        <hr/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    dishes: state.firestore.ordered.dishes,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(DishList);
