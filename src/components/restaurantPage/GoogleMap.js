import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import Geocode from "react-geocode";
import GoogleMaps from "simple-react-google-maps";

const styles = (theme) => ({
    root: {
        height: "25rem", 
        width: "90%",
        marginLeft: "5%",
    },
});

const GoogleMap = ({ classes, restaurant }) => {
  console.log("resto in geogoogle", restaurant);
  Geocode.setApiKey("AIzaSyDXqly7--kzaJ8_3YYM_rc9l_td59XPUwE");
  Geocode.setLanguage("fr");
  Geocode.setRegion("fr");

//   const [latitude, setLatitude] = useState();
//   const [longitude, setLongitude] = useState();
//   const marker = { latitude, longitude }
//   console.log("marker", marker)

//   Geocode.fromAddress(
//     `${restaurant.adress}, ${restaurant.postalCode}, ${restaurant.city}`
//   ).then(
//     (response) => {
//       const { lat, lng } = response.results[0].geometry.location;
//       console.log("lat :", lat, "long :", lng);
//       setLatitude(lat);
//       setLongitude(lng);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
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
