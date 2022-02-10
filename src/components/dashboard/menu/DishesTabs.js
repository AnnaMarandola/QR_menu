import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DishItemEdit from "./DishItemEdit";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#E81B7D",
    padding: "1rem",
    paddingBottom: "1rem",
    fontWeight: 400,
  },
});

function DishesTabs({ classes, restaurant, dishes, menu }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredDishes =
    dishes &&
    dishes.filter((dish) => dish.category === "starter" || "main" || "dessert");

  const sortedDishes =
    filteredDishes &&
    filteredDishes.reduce(
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
  const unknown =
    dishes &&
    dishes.filter((dish) => dish.category !== "starter" || "main" || "dessert");

  return (
    <div className={classes.root}>
      <Typography className={classes.cardHeader}>Mes plats:</Typography>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Entrées" {...a11yProps(0)} />
          <Tab label="Plats" {...a11yProps(1)} />
          <Tab label="Desserts" {...a11yProps(2)} />
          <Tab label="Tous" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {starters &&
          starters.map((starter) => (
            <DishItemEdit dish={starter} key={starter.id} />
          ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {mains &&
          mains.map((main) => <DishItemEdit dish={main} key={main.id} />)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {desserts &&
          desserts.map((dessert) => (
            <DishItemEdit dish={dessert} key={dessert.id} />
          ))}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {unknown &&
          unknown.map((dessert) => (
            <DishItemEdit dish={dessert} key={dessert.id} />
          ))}
      </TabPanel>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(DishesTabs);
