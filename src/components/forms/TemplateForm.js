import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, Radio, Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import TemplateCarroussel from "../TemplateCarroussel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {updateRestaurant} from '../../store/actions/restaurantActions';

const styles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 640,
  },
});

const TemplateForm = ({ classes, restaurant, auth, updateRestaurant }) => {
  console.log("restaurant in template form", restaurant);
  console.log("auth in template form", auth.uid);
  const restoId = restaurant && restaurant.id;
  console.log('restoId', restoId)

  const [selectedTemplate, setSelectedTemplate] = useState("a");


  const handleChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const selectTemplate = (e) => {
    e.preventDefault();
    updateRestaurant({ restoId: restoId, template: selectedTemplate });
    console.log("submited template", selectedTemplate);
  };

  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width: 600px)");

  console.log("selected template", selectedTemplate);

  return (
    <div>
      <form className={classes.root}>
        <Typography>Selectionnez un modèle :</Typography>
        <div>
          <Card className={classes.root}>
            <Typography gutterBottom variant="h5">
              La carte complète : entrées, plats & desserts
            </Typography>
            <Typography gutterBottom variant="h5">
              selectionner ce menu
            </Typography>
            <Radio
              checked={selectedTemplate === "template1"}
              onChange={handleChange}
              value="template1"
              name="radio-button-demo"
              inputProps={{ "aria-label": "carte complète" }}
            />
          </Card>
          <Card className={classes.root}>
            <Typography gutterBottom variant="h5">
              La carte "formule menu du jour"
            </Typography>
            <Typography gutterBottom variant="h5">
              selectionner ce menu
            </Typography>
            <Radio
              checked={selectedTemplate === "template2"}
              onChange={handleChange}
              value="template2"
              name="radio-button-demo"
              inputProps={{ "aria-label": "carte formule" }}
            />
          </Card>
          <Card className={classes.root}>
            <Typography gutterBottom variant="h5">
              La carte thématique
            </Typography>
            <Typography gutterBottom variant="h5">
              selectionner ce menu
            </Typography>
            <Radio
              checked={selectedTemplate === "template3"}
              onChange={handleChange}
              value="template3"
              name="radio-button-demo"
              inputProps={{ "aria-label": "carte thématique" }}
            />
            <div>
            <Button onClick={handleClick}> démo </Button>
            <TemplateCarroussel
              isMobile={matches}
              handleOpen={handleOpen}
              setHandleOpen={setHandleOpen}
            />
            </div>
          </Card>
        </div>
        <Button onClick={selectTemplate}>valider</Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    restaurant: state.firestore.ordered.restaurants && state.firestore.ordered.restaurants[0]
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {updateRestaurant}),
  firestoreConnect(props => [
    {
      collection: 'restaurants',
      storeAs: 'restaurant',
      where: [['restaurant.ownerId', '==', props.auth.uid]],
    }
  ])
)(TemplateForm);
