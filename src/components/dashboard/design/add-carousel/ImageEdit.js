import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { removeCarouselPicture } from "../../../../store/actions/restaurantActions";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  img: {
    backgroundColor: "grey",
    width: "4.5rem",
    margin: "1rem",
    marginBottom: 0,
  },
});

const ImageEdit = ({ classes, image, carousel, restoId, removeCarouselPicture }) => {
  // const imgIndex = carousel.indexOf(image);
  // console.log("INDEX", imgIndex);

  const handleClick = (e) => {
    removeCarouselPicture({ restoId: restoId, image: image });
  };

  return (
    <div className={classes.root}>
      <img className={classes.img} src={image} alt="restaurant" />
      <Button onClick={handleClick}>x</Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCarouselPicture: (restoId, image) =>
      dispatch(removeCarouselPicture(restoId, image)),
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(ImageEdit);
