import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, Radio, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import TemplateCard from "./TemplateCard";
// import { Redirect } from "react-router-dom";
import TEMP1 from "../../assets/templates/snapshotTemp1.png";
import TEMP2 from "../../assets/templates/snapshotTemp2.png";
import TEMP3 from "../../assets/templates/snapshotTemp3.png";
import {
  createMenu,
  updateMenuTemplate,
} from "../../store/actions/menuActions";
import { updateRestaurant } from "../../store/actions/restaurantActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const styles = (theme) => ({
  root: {
    marginTop: "1rem",
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  designButton: {
    color: theme.palette.primary.red,
    marginTop: "-8rem",
  },
  designTitle: {
    marginBottom: "1rem",
  },
  rootForm: {
    maxWidth: 345,
    marginLeft: "0.4rem",
  },
  introForm: {
    marginBottom: "1.5rem",
  },
  titleForm: {
    fontSize: "1.6rem",
    paddingTop: "5rem",
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

const TemplateForm = ({
  classes,
  restaurant,
  auth,
  createMenu,
  updateRestaurant,
  updateMenuTemplate,
}) => {
  const restoId = restaurant && restaurant.id;
  const menuId = restaurant && restaurant.menuId;

  const [open, setOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState(
    (restaurant && restaurant.template) || "template3"
  );
  // const [submitedForm, setSubmitedForm] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");
  console.log(menuTitle);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectedTemplate(event.target.value);
    if (event.target.value === "template2") {
      setMenuTitle("Menu du jour");
    } else {
      setMenuTitle("La carte");
    }
  };

  const selectTemplate = (e) => {
    e.preventDefault();
    // setSubmitedForm(true);
    updateRestaurant({
      restoId: restoId,
      template: selectedTemplate,
      menuTitle: menuTitle,
    });
    updateMenuTemplate({
      menuId: menuId,
      template: selectedTemplate,
      menuTitle: menuTitle,
    });
    handleClose();
  };

  console.log("selected template", selectedTemplate);
  // if (submitedForm === true) return <Redirect to="/dashboard" />;

  return (
    <div>
      <div className={classes.root}>
        {!open && (
          <div>
            <Button onClick={handleClickOpen} className={classes.designButton}>
              <EditRoundedIcon style={{ fill: "white" }} /> Modèle de mise en
              page
            </Button>
          </div>
        )}

        {open && (
          <div>
            <Typography variant="h2" className={classes.designTitle}>
              Selectionnez un modèle de mise en page pour votre carte :
            </Typography>

            <form className={classes.rootForm}>
              <div className={classes.introForm}>
                <Typography variant="h1" className={classes.titleForm}>
                  Selectionnez un modèle de mise en page du menu :
                </Typography>
                <Typography variant="body2" className={classes.textForm}>
                  Tous les designs disposent d'
                  <span className={classes.goodies}>
                    un nombre illimité de plats{" "}
                  </span>
                  et de l'
                  <span className={classes.goodies}>
                    affichage des allergènes !
                  </span>
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
              <Button
                className={classes.validateButton}
                onClick={selectTemplate}
              >
                valider
              </Button>
            </form>

            <Button onClick={handleClose}>X</Button>
          </div>
        )}
      </div>
    </div>
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
    updateRestaurant: (payload) => dispatch(updateRestaurant(payload)),
    updateMenuTemplate: (payload) => dispatch(updateMenuTemplate(payload)),
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
