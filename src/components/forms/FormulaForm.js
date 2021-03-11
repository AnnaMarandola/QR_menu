import React, { useState } from "react";
import {
  withStyles,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Card,
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateMenuFormula } from "../../store/actions/menuActions";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "white",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    color: "#f5564e",
    fontWeight: 400,
    margin: "1rem",
  },
  formula: {
    display: "flex",
    flexDirection: "column",
    // width: "100%",
  },
  formulaCard: {
    margin: "0.5rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
  },
  formulaInput: {
    width: "80%",
  },
  priceInput: {
    marginTop: "1rem",
    width: "15%",
  },
  formulaComment: {
    width: "80%",
  },
  submitButton: {
    backgroundColor: "#f5564e",
    color: "white",
    width: "60%",
    marginLeft: "20%",
    marginTop: "2rem",
  },
  closeButton: {
    backgroundColor: "#031627",
    color: "white",
    width: "60%",
    marginLeft: "20%",
    margin: "1rem",
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
      formula1: formula1 || menu.formula1,
      formula1Price: formula1Price || menu.formula1Price,
      formula1Comment: formula1Comment || menu.formula1Comment || "",
      formula2: formula2 || menu.formula2,
      formula2Price: formula2Price || menu.formula2Price,
      formula2Comment: formula2Comment || menu.formula2Comment || "",
    });
    handleClose();
  };

  return (
    <Card>
    <form onSubmit={handleSubmit} className={classes.root}>
          <Typography variant="body2" className={classes.title}>Les formules</Typography>
      <div className={classes.formula}>
      <Card className={classes.formulaCard}>
        <TextField
          id="formula1"
          label="Formule 1"
          defaultValue={menu.formula1 || formula1}
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
          defaultValue={menu.formula1Price || formula1Price}
          required="required"
        />
        <TextField
          id="formula1Comment"
          label="commentaires, supplements"
          defaultValue={menu.formula1Comment || formula1Comment }
          onChange={(e) => setFormula1Comment(e.target.value)}
          className={classes.formulaComment}
          type="text"
        />
        </Card>

        <Card className={classes.formulaCard}>
        <TextField
          id="formula2"
          label="Formule 2"
          defaultValue={menu.formula2 || formula2}
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
          defaultValue={menu.formula2Price || formula2Price}
          required="required"
        />
        <TextField
          id="formula2Comment"
          label="commentaires, supplements"
          defaultValue={menu.formula2Comment || formula2Comment}
          onChange={(e) => setFormula2Comment(e.target.value)}
          className={classes.formulaComment}
          type="text"
        />
        </Card>
      </div>
      <Button className={classes.submitButton} type="submit">
        Valider
      </Button>
      <Button className={classes.closeButton} onClick={handleClose}>quiter</Button>

    </form>
    </Card>
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
