import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Typography, Radio, Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import TemplateCard from "./TemplateCard";
import TEMP1 from "../../../assets/templates/snapshotTemp1.png";
import TEMP2 from "../../../assets/templates/snapshotTemp2.png";
import TEMP3 from "../../../assets/templates/snapshotTemp3.png";
import {
  createMenu,
  updateMenuTemplate,
} from "../../../store/actions/menuActions";
import { updateRestaurant } from "../../../store/actions/restaurantActions";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const styles = (theme) => ({
  rootCard: {
    minWidth: 345,
    maxWidth: 345,
    backgroundColor: "white",
    marginTop: "1rem",
    marginBottom: "1rem",
    [theme.breakpoints.up("md")]: {
      minWidth: 345,
      maxWidth: 600,
      marginLeft: 0,
    },

  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#f5564e",
    padding: "1rem",
    fontWeight: 400,
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
  },
  subtitle: {
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
  templateSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
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
  menu,
  updateRestaurant,
  updateMenuTemplate,
}) => {
  const restoId = restaurant && restaurant.id;
  const menuId = restaurant && restaurant.menuId;
  const menuTemplate = menu && menu.template;

  const [open, setOpen] = useState(
    restaurant && restaurant.menuId ? false : true
  );

  const [selectedTemplate, setSelectedTemplate] = useState(
    (restaurant && restaurant.template) || "Carte thématique"
  );
  const [menuTitle, setMenuTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectedTemplate(event.target.value);
    if (event.target.value === "Menu du jour") {
      setMenuTitle("Menu du jour");
    } else {
      setMenuTitle("La carte");
    }
  };

  const selectTemplate = (e) => {
    e.preventDefault();
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


  return (
    <Card className={classes.rootCard}>
      <Typography className={classes.cardHeader}>
      Modèle de mise en page
      </Typography>
      <div>
        {!open && (
          <div className={classes.templateSelected}>
            <Typography>{menuTemplate}</Typography>
            <Button onClick={handleClickOpen}>
              <EditRoundedIcon style={{ fill: "#f5564e" }} />
            </Button>
          </div>
        )}

        {open && (
          <div>
            <form className={classes.rootForm}>
              <div className={classes.introForm}>
                <Typography variant="h1" className={classes.titleForm}>
                  Selectionnez un modèle de mise en page du menu :
                </Typography>
                <Typography variant="body2" className={classes.textForm}>
                  Tous les designs disposent d'
                  <span className={classes.subtitle}>
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
                    checked={selectedTemplate === "Carte complète"}
                    onChange={handleChange}
                    value="Carte complète"
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
                    checked={selectedTemplate === "Menu du jour"}
                    onChange={handleChange}
                    value="Menu du jour"
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
                    checked={selectedTemplate === "Carte thématique"}
                    onChange={handleChange}
                    value="Carte thématique"
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
    </Card>
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
