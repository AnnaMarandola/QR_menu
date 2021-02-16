import React from "react";
import { Typography, Button, Fab, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DishItem from "./DishItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FooterResto from "./FooterResto";
import RestoCarousel from "./RestoCarousel";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { NavLink } from "react-router-dom";
import RestoNavBar from "./RestoNavBar";
import GoogleMap from "./GoogleMap";
import PHONE from "../../assets/icons/contactPhone.png";
import FACEBOOK from "../../assets/icons/contactFacebook.png";
import INSTAGRAM from "../../assets/icons/instagrm.png";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import ContactRestoForm from "./ContactRestoForm";
import Loading from "../Loading";

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: "white",
  },
  menuHearder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "1rem",
  },
  logo: {
    maxWidth: "40%",
    marginBottom: "1rem",
  },
  restoName: {
    margin: "2rem",
  },
  menuTitle: {
    marginTop: "3rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  formulaContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
  },
  formula: {
    textAlign: "center",
  },
  formulaAndPrice: {
    display: "flex",
    justifyContent: "space-around",
  },
  formulaComment: {
    marginBottom: "1rem",
  },
  menuBody: {
    marginBottom: "4rem",
  },
  categoryHeader: {
    backgroundColor: "white",
  },
  carouselSection: {},
  categoryTitle: {
    width: "10rem",
    height: "2rem",
    margin: "auto",
    color: "white",
  },
  dishList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  footerSection: {
    height: "4rem",
    width: "100%",
    marginTop: "1rem",
    bottom: 0,
  },
  mediaLogo: {
    width: "60px",
  },
  contactTitle: {
    textAlign: "center",
  },
  goBackContainer: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  goBackButton: {
    backgroundColor: "#E81B7D",
    position: "relative",
    top: "1.5rem",
    left: "1rem",
    zIndex: 3,
  },
  backArrow: {
    fill: "white",
  },
  adress: {
    marginTop: "4rem",
    marginBottom: "6rem",
    textAlign: "center",
  },
  adressUnderMap: {
    margin: "2rem",
    textAlign: "center",
  },
  adressText: {
    fontFamily: "Archivo narrow",
    fontSize: "1rem",
  },
  phoneContact: {
    textAlign: "center",
    margin: "1rem",
  },
  phoneNumber: {
    fontFamily: "Archivo narrow",
  },
  socialContainer: {
    marginTop: "4rem",
    width: "90%",
    marginLeft: "5%",
    backgroundColor: "white",
  },
  socialMedia: {
    margin: "1rem",
  },
  contactIcons: {
    width: "15%",
  },
  instaIcon: {
    width: "15%",
    marginTop: "1rem",
  },
  fbIcon: {
    width: "15%",
  },
  secondTitle: {
    fontSize: "1.5rem",
    marginTop: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  socialTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "1rem",
    textAlign: "center",
    // fontWeight: 500,
  },
  link: {
    textDecoration: "none",
  },
  bookingButton: {
    width: "50%",
    marginLeft: "25%",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginTop: "3rem",
    border: "solid 3px black",
    marginBottom: "4rem",
  },
});

const MenuPage = ({ classes, restaurant, menu, dishes, auth }) => {
  const resto = { ...restaurant };
  const menuData = { ...menu };
  const formatedPhone = restaurant && restaurant.phone.substring(1);
  const days = restaurant && restaurant.daysOff.join(", ");

  let publishedDishes =
    dishes && dishes.filter((dish) => dish.published === true);

  const sortedDishes =
    publishedDishes &&
    publishedDishes.reduce(
      (acc, val) => {
        if (val.category) acc[val.category].push(val);
        return acc;
      },
      { starter: [], main: [], dessert: [] }
    );
  const sorts = { ...sortedDishes };
  const starters = sorts && sorts.starter;
  const mains = sorts && sorts.main;
  const desserts = sorts && sorts.dessert;

  if (!restaurant && !menu) return <Loading/>;


  return (
    <div className={classes.root}>
      <RestoNavBar menu={menuData} />
      {auth && auth.uid && (
        <div
          className={classes.goBackContainer}
          style={{ backgroundColor: menuData.headerColor }}
        >
          <NavLink to="/dashboard">
            <Fab size="small" className={classes.goBackButton}>
              <ArrowBackOutlinedIcon className={classes.backArrow} />
            </Fab>
          </NavLink>
        </div>
      )}
      <div
        className={classes.menuHearder}
        style={{ backgroundColor: menuData.headerColor }}
      >
        <Typography
          className={classes.restoName}
          variant="h1"
          style={{
            color: menuData.fontColor || "#272727",
            fontFamily: menuData.fontFamily || "Roboto",
            fontSize: menuData.fontSize,
          }}
        >
          {resto.name}
        </Typography>
        <img className={classes.logo} src={resto.logo} alt="logo" />
      </div>
      {restaurant && [restaurant.carousel].length > 0 && (
        <div className={classes.carouselSection}>
          <RestoCarousel restaurant={resto} />
        </div>
      )}
      <section id="menu">
        <div className={classes.menuBody}>
          <Typography
            variant="h1"
            className={classes.menuTitle}
            style={{
              fontFamily: menuData.fontFamily || "Roboto",
            }}
          >
            {menuData.menuTitle}
          </Typography>
          {menu && menu.template === "Menu du jour" && (
            <div className={classes.formulaContainer}>
              <div className={classes.formula}>
                <div className={classes.formulaAndPrice}>
                  <Typography>{menuData.formula1}</Typography>
                  <Typography>
                    {menuData.formula1Price} {menuData.formula2 ? "€" : null}
                  </Typography>
                </div>
                <Typography className={classes.formulaComment}>
                  {menuData.formula1Comment}
                </Typography>
              </div>
              <div className={classes.formula}>
                <div className={classes.formulaAndPrice}>
                  <Typography>{menuData.formula2}</Typography>
                  <Typography>
                    {menuData.formula2Price} {menuData.formula2 ? "€" : null}
                  </Typography>
                </div>
                <Typography>{menuData.formula2Comment}</Typography>
              </div>
            </div>
          )}
          {menu && menu.template === "Carte thématique" && (
            <div>
              {publishedDishes &&
                publishedDishes.map((dish) => (
                  <DishItem
                    key={dish.id}
                    menu={menuData}
                    title={dish.dishName}
                    price={dish.price}
                    ingredients={dish.ingredients}
                    description={dish.description}
                    allergens={dish.checkedAllergens}
                    picture={dish.picture}
                  />
                ))}
            </div>
          )}
          {menu &&
            (menu.template === "Carte complète" ||
              menu.template === "Menu du jour") && (
              <div className={classes.menuSection}>
                <Accordion className={classes.accordion}>
                  <AccordionSummary className={classes.categoryHeader}>
                    <Button
                      className={classes.categoryTitle}
                      style={{
                        backgroundColor: menuData.headerColor || "#272727",
                      }}
                    >
                      Entrée
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails className={classes.dishList}>
                    {starters &&
                      starters.map((starter) => (
                        <DishItem
                          key={starter.id}
                          menu={menuData}
                          title={starter.dishName}
                          price={starter.price}
                          ingredients={starter.ingredients}
                          description={starter.description}
                          allergens={starter.checkedAllergens}
                          picture={starter.picture}
                        />
                      ))}
                  </AccordionDetails>
                </Accordion>
                <Accordion className={classes.accordion}>
                  <AccordionSummary className={classes.categoryHeader}>
                    <Button
                      className={classes.categoryTitle}
                      style={{
                        backgroundColor: menuData.headerColor || "#272727",
                      }}
                    >
                      Plats
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails className={classes.dishList}>
                    {mains &&
                      mains.map((main) => (
                        <DishItem
                          key={main.id}
                          menu={menuData}
                          title={main.dishName}
                          price={main.price}
                          ingredients={main.ingredients}
                          description={main.description}
                          allergens={main.checkedAllergens}
                          picture={main.picture}
                        />
                      ))}
                  </AccordionDetails>
                </Accordion>
                <Accordion className={classes.accordion}>
                  <AccordionSummary className={classes.categoryHeader}>
                    <Button
                      className={classes.categoryTitle}
                      style={{
                        backgroundColor: menuData.headerColor || "#272727",
                      }}
                    >
                      Desserts
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails className={classes.dishList}>
                    {desserts &&
                      desserts.map((dessert) => (
                        <DishItem
                          key={dessert.id}
                          menu={menuData}
                          title={dessert.dishName}
                          price={dessert.price}
                          ingredients={dessert.ingredients}
                          description={dessert.description}
                          allergens={dessert.checkedAllergens}
                          picture={dessert.picture}
                        />
                      ))}
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
        </div>
      </section>

      <section id="infoscontact">
        <a href={`tel:+33${formatedPhone}`} className={classes.link}>
          <Button className={classes.bookingButton}>
            <PhoneInTalkIcon className={classes.callIcon} />
            Reservez
          </Button>
        </a>
        <div className={classes.adress}>
          {restaurant && restaurant.opening && restaurant.closing && (
            <Typography className={classes.adressText}>
              {" "}
              Ouvert de {resto.opening} à {resto.closing}
            </Typography>
          )}

          {restaurant && restaurant.daysOff.length > 0 && (
            <Typography className={classes.adressText}>
              {restaurant && restaurant.daysOff.length > 1
                ? "Fermé les "
                : "Fermé le "}
              {days}
            </Typography>
          )}

          {restaurant && restaurant.lunchStart && restaurant.lunchEnd && (
            <div>
              <Typography
                variant="h1"
                className={classes.secondTitle}
                style={{
                  fontFamily: menuData.fontFamily || "Roboto",
                }}
              >
                Le midi
              </Typography>
              <Typography className={classes.adressText}>
                {" "}
                Service de {resto.lunchStart} à {resto.lunchEnd}
              </Typography>
            </div>
          )}

          {restaurant && restaurant.dinerStart && restaurant.dinerEnd && (
            <div>
              <Typography
                variant="h1"
                className={classes.secondTitle}
                style={{
                  fontFamily: menuData.fontFamily || "Roboto",
                }}
              >
                Le soir
              </Typography>
              <Typography className={classes.adressText}>
                {" "}
                Service de {resto.dinerStart} à {resto.dinerEnd}
              </Typography>
            </div>
          )}
        </div>

        <GoogleMap restaurant={resto} />

        <div className={classes.adressUnderMap}>
          <Typography className={classes.adressText}>{resto.adress}</Typography>
          <Typography className={classes.adressText}>
            {resto.postalCode} {resto.city}
          </Typography>
          <div className={classes.phoneContact}>
            <a className={classes.phone} href={`tel:+33${formatedPhone}`}>
              <Button>
                <img
                  className={classes.contactIcons}
                  src={PHONE}
                  alt="telephone"
                />
              </Button>
            </a>
            <Typography className={classes.phoneNumber}>
              {resto.phone}
            </Typography>
          </div>
        </div>
        {restaurant && (restaurant.facebook || restaurant.instagram) && (
          <Card className={classes.socialContainer}>
            <Typography className={classes.socialTitle}>
              Retrouvez-nous sur nos réseaux sociaux
            </Typography>
            <div className={classes.socialMedia}>
              <a className={classes.phon} href={resto.phone}>
                <Button>
                  <img
                    className={classes.fbIcon}
                    src={FACEBOOK}
                    alt="facebook"
                  />
                </Button>
              </a>
              <a className={classes.phon} href={resto.phone}>
                <Button>
                  <img
                    className={classes.instaIcon}
                    src={INSTAGRAM}
                    alt="facebook"
                  />
                </Button>
              </a>
            </div>
          </Card>
        )}

        <ContactRestoForm restaurant={resto} />
      </section>

      <div className={classes.footerSection}>
        <FooterResto />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
    dishes: state.firestore.ordered.dishes,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      doc: props.match.params.resto,
    },
    {
      collection: "menus",
      doc: props.match.params.menu,
    },
    {
      collection: "dishes",
      where: ["menuId", "==", props.match.params.menu],
    },
  ])
)(MenuPage);
