import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { Carousel } from "react-responsive-carousel";
// eslint-disable-next-line
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

const cstyles = (theme) => ({
  root: {},
  image: {
    // height: "18rem",
  },
});

const RestoCarousel = ({ classes, restaurant }) => {
  const images = restaurant.carousel;

  return (
    <Carousel
      className={classes.root}
      autoPlay
      showThumbs={false}
      interval="10000"
      infiniteLoop={true}
    >
      {restaurant &&
        images &&
        images.map((image) => (
          <img src={image} alt="" key={image.id} className={classes.image} />
        ))}
    </Carousel>
  );
};

export default compose(withStyles(cstyles))(RestoCarousel);
