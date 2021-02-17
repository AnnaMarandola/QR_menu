import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { removeCarouselPicture } from "../../../../store/actions/restaurantActions";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const styles = (theme) => ({
  img: {
    display: "none",
  },
});

const ImageEdit = ({ classes, image, restoId, removeCarouselPicture }) => {

  const handleClick = (e) => {
    removeCarouselPicture({ restoId: restoId, image: image });
  };

  return (
    <div className={classes.root}>
      <img className={classes.img} src={image} alt="restaurant" />
      <DeleteForeverIcon onClick={handleClick}/>
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
