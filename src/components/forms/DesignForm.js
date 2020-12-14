import React, { useState } from "react";
import ColorPicker from "material-ui-color-picker";
import { withStyles, Typography, MenuItem, Select, Card } from "@material-ui/core";
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
    padding: "2rem",
    overflow: "visible",
  },
  colorInput: {
    width: "3rem",
    marginBottom: "1rem",
  },
  fontForm: {
    width: "20rem",
    marginBottom: "2rem",
    marginTop: "2rem"
  },
  fontInput: {
    fontFamily: menu && menu.fontFamily,
    minWidth: "10rem",
    textAlign: "center"
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
  let resto = {...restaurant}
  const [headerColor, setHeaderColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [font, setFont] = useState("Roboto");

  const handleChangeHeaderColor = (color) => {
    setHeaderColor(color);
    selectHeaderColor({ menuId: menu.id, color: headerColor });
  };

  const handleChangeFontColor = (color) => {
    setFontColor(color);
    selectFontColor({ menuId: menu.id, fontColor: fontColor });
  };

  const handleChangeFontFamily = (e) => {
    setFont(e.target.value);
    selectFontFamily({ menuId: menu.id, fontFamily: e.target.value });

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

        <Typography variant="body2">Couleur du texte</Typography>

        <ColorPicker
          className={classes.colorInput}
          style={{ backgroundColor: (menu && menu.fontColor) || fontColor }}
          name="color"
          defaultValue={fontColor}
          value={fontColor}
          onChange={handleChangeFontColor}
        />

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
