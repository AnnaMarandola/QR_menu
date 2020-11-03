import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { createDish } from "../../store/actions/dishActions";
import { compose } from "redux";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    width: "90%",
  },
  accordion: {
    backgroundColor: "white",
  },
  heading: {
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    padding: "0, 1.5rem, 0, 1.5rem",
    color: theme.palette.primary.whiteish,
    marginTop: "1rem",
  },
  rootAllergens: {
    width: "94%",
    marginTop: "1rem",
    backgroundColor: "white",
  },
});

class AddNewDish extends Component {
  
  state = {
    restoId: "",
    menuId: "",
    dishName: "",
    ingredients: "",
    description: "",
    checkedAllergens: [],
    price: "",
  };

  

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      restoId: this.props.restaurant.id,
      menuId: this.props.restaurant.menuId,
    });
  };

  handleToggle = (value) => () => {
    const currentIndex = this.state.checkedAllergens.indexOf(value);
    const newChecked = [...this.state.checkedAllergens];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checkedAllergens: newChecked });
    console.log("checked", this.checkedAllergens);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createDish(this.state);
    console.log("dish created", this.state);
  };

  render() {
    const { classes, restaurant } = this.props;
    console.log("AAAAAAAAAAAAAAAArestaurant id in AddNewDish", restaurant && restaurant.id);
    let menuId = restaurant && restaurant.menuId
    console.log("AAAAAAAAAAAAAAAA menuId in restaurant", menuId )

    return (
      <div className={classes.root}>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>ajouter un plat</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                className={classes.input}
                id="dishName"
                label="nom du plat"
                onChange={this.handleChange}
              />
              <TextField
                className={classes.input}
                id="ingredients"
                label="ingredients"
                onChange={this.handleChange}
              />
              <TextField
                className={classes.input}
                id="description"
                label="description"
                onChange={this.handleChange}
              />
              <TextField
                className={classes.input}
                id="price"
                label="prix"
                onChange={this.handleChange}
              />
              <Accordion className={classes.rootAllergens}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    allergènes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Sélectionnez les allergènes présents dans ce plat
                  </Typography>
                  <List>
                    {[
                      "celeri",
                      "crustace",
                      "poisson",
                      "gluten",
                      "lupin",
                      "lait",
                      "molusque",
                      "moutarde",
                      "fruits-a-coques",
                      "cacahuette",
                      "sesame",
                      "sulfites",
                      "soja",
                    ].map((value) => {
                      const labelId = `checkbox-list-secondary-label-${value}`;
                      return (
                        <ListItem key={value} button>
                          <ListItemAvatar>
                            <Avatar
                              alt={`${value}`}
                              src={require(`../../assets/allergens/${value}.png`)}
                            />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={` ${value}`} />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              onChange={this.handleToggle(value)}
                              checked={
                                this.state.checkedAllergens.indexOf(value) !==
                                -1
                              }
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Button
                className={classes.addButton}
                type="submit"
                onClick={this.handleSubmit}
              >
                ajouter à mon menu
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createDish: (dish) => dispatch(createDish(dish)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddNewDish);