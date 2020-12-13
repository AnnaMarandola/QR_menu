import React, { useState } from "react";
import ColorPicker from "material-ui-color-picker";
import { Button, withStyles, Typography, MenuItem, Select, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  selectHeaderColor,
  selectFontColor,
  selectFontFamily,
} from "../../store/actions/menuActions";

const styles = (theme, menu) => ({
  root: {
    backgroundColor: "white",
    paddingTop: "2rem",
    paddingLeft: "2rem",
  },
  colorInput: {
    width: "4rem",
    marginBottom: "1rem",
  },
  fontForm: {
    width: "20rem",
    marginBottom: "2rem",
    marginTop: "2rem"
  },
  fontInput: {
    fontFamily: menu && menu.fontFamily,
  },
  fontLabel: {
    marginLeft: "1rem",
  },
  police1: {
    fontFamily: "Lobster",
  },
  police2: {
    fontFamily: "Great Vibes",
  },
  police3: {
    fontFamily: "Anton Roboto",
  },
  police4: {
    fontFamily: "Cantarell",
  },
});

const DesignForm = ({
  classes,
  restaurant,
  menu,
  selectHeaderColor,
  selectFontColor,
  selectFontFamily,
}) => {
  let menuColor = menu && menu.headerColor;
  let menuFontColor = menu && menu.fontColor;
  let resto = {...restaurant}
  const [headerColor, setHeaderColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [font, setFont] = useState("Roboto");

  const handleChangeHeaderColor = (color) => {
    setHeaderColor(color);
    console.log("headerColor", headerColor);
  };

  const handleChangeFontColor = (color) => {
    setFontColor(color);
    console.log("fontColor", fontColor);
  };

  const handleChangeFontFamily = (e) => {
    setFont(e.target.value);
  };

  const submitHeaderColor = (e) => {
    e.preventDefault();
    selectHeaderColor({ menuId: menu.id, color: headerColor });
  };

  const submitFontColor = (e) => {
    e.preventDefault();
    selectFontColor({ menuId: menu.id, fontColor: fontColor });
  };

  const submitFontFamily = (e) => {
    selectFontFamily({ menuId: menu.id, fontFamily: font });
  };
  return (
    <div>
    <Card className={classes.root}>
      <form className={classes.headerColorForm}>
        <Typography variant="body2">Couleur de fond</Typography>

        <ColorPicker
          className={classes.colorInput}
          style={{ backgroundColor: menuColor || headerColor }}
          name="color"
          defaultValue={headerColor}
          value={headerColor}
          onChange={handleChangeHeaderColor}
        />
        {headerColor !== menuColor && (
          <Button onClick={submitHeaderColor}>valider</Button>
        )}
      </form>

      <form className={classes.fontColorForm}>
        <Typography variant="body2">Couleur du texte</Typography>

        <ColorPicker
          className={classes.colorInput}
          style={{ backgroundColor: (menu && menu.fontColor) || fontColor }}
          name="color"
          defaultValue={fontColor}
          value={fontColor}
          onChange={handleChangeFontColor}
        />
        {fontColor !== menuFontColor && (
          <Button onClick={submitFontColor}>valider</Button>
        )}
      </form>

      <form className={classes.fontForm}>
        <Typography variant="body2">Police d'écriture</Typography>
        <Select
          className={classes.fontInput}
          variant="outlined"
          onChange={handleChangeFontFamily}
          defaultValue="Roboto"
          style={{ fontFamily: font }}
        >
          <MenuItem value={"Lobster"} className={classes.police1}>
            {resto.name}
          </MenuItem>
          <MenuItem value={"Great Vibes"} className={classes.police2}>
            {resto.name}
          </MenuItem>
          <MenuItem value={"Anton Roboto"} className={classes.police3}>
            {resto.name}
          </MenuItem>
          <MenuItem value={"Oxygen"} className={classes.police4}>
            {resto.name}
          </MenuItem>
          <MenuItem value={"Roboto"} className={classes.police4}>
            {resto.name}
          </MenuItem>
        </Select>
        <Button onClick={submitFontFamily}>Valider</Button>
      </form>
    </Card>
    </div>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {
    selectHeaderColor: (menuId, color) =>
      dispatch(selectHeaderColor(menuId, color)),
    selectFontColor: (menuId, fontColor) =>
      dispatch(selectFontColor(menuId, fontColor)),
    selectFontFamily: (menuId, fontFamily) =>
      dispatch(selectFontFamily(menuId, fontFamily)),
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(DesignForm);
