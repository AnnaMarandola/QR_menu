import React, { useState } from "react";
import {
  withStyles,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateMenuFormula } from "../../store/actions/menuActions";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    textAlign: "start",
    marginBottom: "2rem",
    fontSize: "1.5rem",
    fontColor: "black",
  },
  formula: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
    width: "100%",
  },
  formulaInput: {
    width: "80%",
  },
  priceInput: {
    width: "15%",
  },
  commentInput: {
    width: "80%",
    marginBottom: "3rem",
  },
  submitButton: {
    backgroundColor: "blue",
    color: "white",
    width: "60%",
    marginLeft: "20%",
    marginBottom: "2rem",
  }
});

const FormulaForm = ({ classes, restaurant, menu, updateMenuFormula, handleClose }) => {
  const [formula1, setFormula1] = useState(
    menu.formula1 || "entrée + plat + dessert"
  );
  const [formula1Price, setFormula1Price] = useState("");
  const [formula1Comment, setFormula1Comment] = useState("");

  const [formula2, setFormula2] = useState(
    menu.formula1 || "entrée + plat  ou  plat + dessert"
  );
  const [formula2Price, setFormula2Price] = useState("");
  const [formula2Comment, setFormula2Comment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMenuFormula({
      menuId: menu.id,
      formula1: formula1,
      formula1Price: formula1Price,
      formula1Comment: formula1Comment,
      formula2: formula2,
      formula2Price: formula2Price,
      formula2Comment: formula2Comment,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography variant="body2" className={classes.title}>Les formules</Typography>
      <div className={classes.formula}>
        <TextField
          id="formula1"
          label="Formule 1"
          value={formula1}
          defaultValue={formula1}
          onChange={(e) => setFormula1(e.target.value)}
          className={classes.formulaInput}
          type="text"
        />
        <TextField
          className={classes.priceInput}
          type="number"
          step="0.01"
          InputProps={{
            endAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          id="priceFormula1"
          label="prix"
          onChange={(e) => setFormula1Price(e.target.value)}
          defaultValue={formula1Price}
          required="required"
        />
        <TextField
          id="formula1Comment"
          label="commentaires, supplements"
          value={formula1Comment}
          onChange={(e) => setFormula1Comment(e.target.value)}
          className={classes.commentInput}
          type="text"
        />

        <TextField
          id="formula2"
          label="Formule 2"
          value={formula2}
          defaultValue={formula2}
          onChange={(e) => setFormula2(e.target.value)}
          className={classes.formulaInput}
          type="text"
        />
        <TextField
          className={classes.priceInput}
          type="number"
          step="0.01"
          InputProps={{
            endAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          id="priceFormula2"
          label="prix"
          onChange={(e) => setFormula2Price(e.target.value)}
          defaultValue={formula2Price}
          required="required"
        />
        <TextField
          id="formula2Comment"
          label="commentaires, supplements"
          value={formula2Comment}
          onChange={(e) => setFormula2Comment(e.target.value)}
          className={classes.formulaInput}
          type="text"
        />
      </div>
      <Button className={classes.submitButton} type="submit">
        Valider
      </Button>
      <Button onClick={handleClose}>x</Button>

    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMenuFormula: (payload) => dispatch(updateMenuFormula(payload)),
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(FormulaForm);
