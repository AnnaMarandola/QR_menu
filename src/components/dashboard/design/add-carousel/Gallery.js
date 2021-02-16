import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import ImageEdit from "./ImageEdit";

const styles = (theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        width: "20rem",
        flexWrap: "wrap",
        marginLeft: "0.6rem",
    },
});

const Gallery = ({ classes, restaurant }) => {
  const images = restaurant.carousel;

  return (
    <div className={classes.root}>
      {restaurant &&
        images &&
        images.map((image) => <ImageEdit image={image} carousel={restaurant.carousel} restoId={restaurant.id} key={image.id} />)
        }
    </div>
  );
};



export default compose(withStyles(styles))(Gallery);
