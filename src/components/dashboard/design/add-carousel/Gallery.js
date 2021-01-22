import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({});

const Gallery = ({ classes, restaurant, carousel }) => {
  console.log("resto in gallery", restaurant.id);
  console.log("CAROUSEL in gallery", carousel);

  return (
    <div className={classes.root}>
      <Typography>coucou</Typography>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    carousel:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0].carousel,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      doc: props.restaurant.id,
      includeDoc: true,
      subcollections: [{ collection: "carousel" }],
      storeAs: "carousel",
    },
  ])
)(Gallery);
