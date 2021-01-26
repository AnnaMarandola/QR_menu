import React from "react";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import GoogleMaps from "simple-react-google-maps";

const styles = (theme) => ({
    root: {
        height: "25rem", 
        width: "90%",
        marginLeft: "5%",
    },
});

const GoogleMap = ({ classes, restaurant }) => {
  return (
    <div>
      <GoogleMaps
        apiKey={"AIzaSyDXqly7--kzaJ8_3YYM_rc9l_td59XPUwE"}
        style={{ height: "25rem", width: "90%", marginLeft: "5%" }}
        zoom={15}
        center={{ lat: restaurant.latitude, lng: restaurant.longitude }}
        markers={{ lat: restaurant.latitude, lng: restaurant.longitude }}
        className={classes.root} />
    </div>
  );
};
export default compose(withStyles(styles))(GoogleMap);
