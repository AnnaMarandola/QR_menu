import React, { Component } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
} from "@material-ui/core";
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
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { createDish, updateDish } from "../../store/actions/dishActions";
import { compose } from "redux";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const styles = (theme) => ({
  root: {
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingLeft: "10%",
  },
  categoryInput: {
    width: "8rem",
    alignItems: "flex-end",
    paddingTop: "10%",
  },

  input: {
    width: "90%",
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  heading: {
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    padding: "0, 1rem, 0, 1rem",
    color: theme.palette.primary.whiteish,
    marginTop: "2rem",
    marginRight: "2rem",
    marginBottom: "2rem",
  },
  rootAllergens: {
    width: "90%",
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
    category: "",
    checkedAllergens: [],
    price: "",
    published: false,
  };

  componentDidMount() {
    if (this.props.dish) {
      this.setState({
        restoId: this.props.dish.restoId,
        menuId: this.props.dish.menuId,
        dishName: this.props.dish.dishName,
        category: this.props.dish.category,
        ingredients: this.props.dish.ingredients,
        description: this.props.dish.description,
        checkedAllergens: this.props.dish.checkedAllergens,
        price: this.props.dish.price,
        published: this.props.dish.published,
      });
    }
  }

  componentDidUpdate = () => {
    console.log("plat ajouté/ mis à jour");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      restoId: this.props.menu.restoId || this.props.dish.restoId,
      menuId: this.props.menu.id || this.props.dish.menuId,
    });
  };

  handleCategory = (e) => {
    this.setState({
      category: e.target.value,
      restoId: this.props.menu.restoId || this.props.dish.restoId,
      menuId: this.props.menu.id || this.props.dish.menuId,
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
    if (!this.props.dish) {
      this.props.createDish(this.state);
      this.props.handleClose();
      toast.success("Votre plat est enregistré !", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      this.props.updateDish(this.state, this.props.dish.id);
      toast.success("Votre plat mis à jour !", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  render() {
    const { classes, dish, menu } = this.props;
    const template = menu.template;

    return (
      <div className={classes.root}>
        <form className={classes.form}>
          {template !== "template3" && (
            <div className={classes.categoryInput}>
              <InputLabel id="category">Catégorie</InputLabel>
              <Select
                className={classes.categoryInput}
                id="category"
                value={dish !== this.state.category ? this.state.category : ""}
                onChange={this.handleCategory}
              >
                <MenuItem value={"starter"}>Entrée</MenuItem>
                <MenuItem value={"main"}>Plat</MenuItem>
                <MenuItem value={"dessert"}>Dessert</MenuItem>
              </Select>
            </div>
          )}

          <TextField
            className={classes.input}
            id="dishName"
            label="nom du plat"
            onChange={this.handleChange}
            defaultValue={dish ? dish.dishName : ""}
          />

          <TextField
            className={classes.input}
            id="ingredients"
            label="ingredients"
            onChange={this.handleChange}
            defaultValue={dish ? dish.ingredients : ""}
          />

          <TextField
            className={classes.input}
            id="description"
            label="description"
            onChange={this.handleChange}
            defaultValue={dish ? dish.description : ""}
          />

          <TextField
            className={classes.input}
            type="number"
            step="0.01"
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            id="price"
            label="prix"
            onChange={this.handleChange}
            defaultValue={dish ? dish.price : ""}
          />

          <Accordion className={classes.rootAllergens}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>allergènes</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordion}>
              <Typography className={classes.heading}>
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
                            this.state.checkedAllergens.indexOf(value) !== -1
                          }
                          inputProps={{ "aria-labelledby": labelId }}
                          defaultValue={dish ? dish.checkedAllergens : []}
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
            {dish ? "Modifier" : "ajouter à mon menu"}
          </Button>
        </form>
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
    updateDish: (dish, dishId) => dispatch(updateDish(dish, dishId)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddNewDish);
