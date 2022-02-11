import React from "react";
import GoogleMaps from "simple-react-google-maps";

const GoogleMap = ({ restaurant }) => {
  return (
    <div>
      <GoogleMaps
        apiKey={process.env.REACT_APP_FIREBASE_API_KEY}
        style={{ height: "25rem", width: "90%", marginLeft: "5%" }}
        zoom={15}
        center={{ lat: restaurant.latitude, lng: restaurant.longitude }}
        markers={{ lat: restaurant.latitude, lng: restaurant.longitude }}
      />
    </div>
  );
};
export default GoogleMap;
