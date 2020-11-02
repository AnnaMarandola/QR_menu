import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
});

class DishList extends Component {


    componentDidUpdate() {
      const menuId = this.props.menu.id;
      console.log("menuId in componentDIdMount DISHLIST", menuId);
    }

  render() {
    const { classes, menu, dishes } = this.props;
    console.log("MENU DATA IN DISHLIST", menu);
    const dishList = { ...dishes}
    console.log("!!!!!!!dishList IN DISHLIST!!!!!!", dishList);

    return (
      <div className={classes.root}>
        <Typography>prout</Typography>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    dishes:
      state.firestore.ordered.dishes &&
      state.firestore.ordered.dishes[0],
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
    firestoreConnect((props) => [
      {
        collection: "dishes",
        where: [["menuId", "==", `${props.menuId}`]]
      },

    ])
)(DishList);
