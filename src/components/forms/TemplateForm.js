import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, Radio, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import TemplateCard from "./TemplateCard";
import { Redirect } from "react-router-dom";
import TEMP1 from "../../assets/templates/snapshotTemp1.png";
import TEMP2 from "../../assets/templates/snapshotTemp2.png";
import TEMP3 from "../../assets/templates/snapshotTemp3.png";
import { createMenu } from "../../store/actions/menuActions";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    marginLeft: "0.4rem",
  },
  introForm: {
    marginBottom: "1.5rem",
  },
  titleForm: {
    fontSize: "1.6rem",
    marginTop: "1rem",
  },
  goodies: {
    fontWeight: 600,
  },
  textForm: {
    marginTop: "1rem",
  },
  media: {
    height: 640,
  },
  selectSection: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1.5rem",
    marginTop: "1rem",
  },
  separator: {
    margin: "2rem",
  },
  validateButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.whiteish,
    marginLeft: "70%",
    marginBottom: "2rem",
  },
});

const TemplateForm = ({ classes, restaurant, auth, createMenu }) => {
  const restoId = restaurant && restaurant.id;

  const [selectedTemplate, setSelectedTemplate] = useState("a");
  const [submitedForm, setSubmitedForm] = useState(false);

  const handleChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const selectTemplate = (e) => {
    e.preventDefault();
    setSubmitedForm(true);
    if (restaurant.menuId != null) {
      console.log("TODO : update menu.template & restaurant.template");
    } else {
      createMenu({ restoId: restoId, template: selectedTemplate });
      console.log("menu created", selectedTemplate);
    }
  };
  console.log("selected template", selectedTemplate);
  if (submitedForm === true) return <Redirect to="/" />;

  return (
    <form className={classes.root}>
      <div className={classes.introForm}>
        <Typography variant="h1" className={classes.titleForm}>
          Selectionnez le design adapté à votre menu .
        </Typography>
        <Typography variant="body2" className={classes.textForm}>
          Tous les designs disposent d'
          <span className={classes.goodies}>un nombre illimité de plats </span>
          et de l'
          <span className={classes.goodies}>affichage des allergènes !</span>
        </Typography>
      </div>
      <div className={classes.cardSection}>
        <TemplateCard
          templateImg={TEMP1}
          templateText={
            "Une page dynamique avec des listes déroulantes pour vos entrées, plats et desserts ."
          }
          templateTitle={"La carte complète"}
        />
        <div className={classes.selectSection}>
          <Radio
            checked={selectedTemplate === "template1"}
            onChange={handleChange}
            value="template1"
            name="radio-button-demo"
            inputProps={{ "aria-label": "carte complète" }}
          />
          <Typography gutterBottom variant="body1">
            sélectionner "La carte complète"
          </Typography>
        </div>
      </div>
      <hr className={classes.separator} />
      <div className={classes.cardSection}>
        <TemplateCard
          templateImg={TEMP2}
          templateText={"Mettez en avant votre menu du jour !"}
          templateTitle={"La carte 'formule du jour'"}
        />
        <div className={classes.selectSection}>
          <Radio
            checked={selectedTemplate === "template2"}
            onChange={handleChange}
            value="template2"
            name="radio-button-demo"
            inputProps={{ "aria-label": "carte formule du jour" }}
          />
          <Typography gutterBottom variant="body1">
            sélectionner La carte "formule du jour"
          </Typography>
        </div>
      </div>
      <hr className={classes.separator} />
      <div className={classes.cardSection}>
        <TemplateCard
          templateImg={TEMP3}
          templateText={
            "Une carte unique pour vos spécialités : salades, pizzas, sandwiches, grillades, pokés ..."
          }
          templateTitle={"La carte thématique"}
        />
        <div className={classes.selectSection}>
          <Radio
            checked={selectedTemplate === "template3"}
            onChange={handleChange}
            value="template3"
            name="radio-button-demo"
            inputProps={{ "aria-label": "carte thématique" }}
          />
          <Typography gutterBottom variant="body1">
            sélectionner "La carte thématique"
          </Typography>
        </div>
      </div>
      <hr className={classes.separator} />
      <Button className={classes.validateButton} onClick={selectTemplate}>
        valider
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMenu: (menu) => dispatch(createMenu(menu)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      storeAs: "restaurant",
      where: [["restaurant.ownerId", "==", props.auth.uid]],
    },
  ])
)(TemplateForm);
