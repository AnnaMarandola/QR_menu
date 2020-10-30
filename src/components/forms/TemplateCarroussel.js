import React from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import Temp1 from "../../assets/templates/snapshotTemp1.png";
import Temp2 from "../../assets/templates/snapshotTemp2.png";
import Temp3 from "../../assets/templates/snapshotTemp3.png";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const TemplateCarousel = ({
  handleOpen,
  setHandleOpen,
  isMobile,
  auth,
}) => {
  console.log("auth in template carousel", auth.uid);

  return (
    <div className="App">
      <AutoRotatingCarousel
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        autoplay={false}
        mobile={isMobile}
        label="choisir ce menu"
        style={{ postion: "absolute" }}

      >
        <Slide
          media={<img alt="something" src={Temp1} />}
          mediaBackgroundStyle={{ backgroundColor: "#F51735" }}
          contentStyle={{ backgroundColor: "#4cead5" }}
          title="La carte complète"
          subtitle="Une page dynamique avec des rubriques déroulantes"
        ></Slide>
        <Slide
          media={<img alt="something" src={Temp2} />}
          mediaBackgroundStyle={{ backgroundColor: "#F89F1D" }}
          contentStyle={{ backgroundColor: "#4CEAD5" }}
          title="La carte menu du jour"
          subtitle="Une page spéciale pour le menu du jour"
        />
        <Slide
          media={<img alt="something" src={Temp3} />}
          mediaBackgroundStyle={{ backgroundColor: "#031627" }}
          contentStyle={{ backgroundColor: "#4CEAD5" }}
          title="La carte thématique"
          subtitle="Créez une carte spéciale pour vos salades, pizzas, tapas"
        />
      </AutoRotatingCarousel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    restaurants: state.firestore.ordered.restaurants,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "restaurants" }])
)(TemplateCarousel);
