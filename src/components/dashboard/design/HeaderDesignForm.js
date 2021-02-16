import React, { useState } from "react";
import ColorPicker from "material-ui-color-picker";
import {
  withStyles,
  Typography,
  MenuItem,
  Select,
  Card,
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  selectHeaderColor,
  selectFontColor,
  selectFontFamily,
  selectFontSize,
} from "../../../store/actions/menuActions";

const styles = (theme, menu) => ({
  root: {
    backgroundColor: "white",
    overflow: "visible",
    marginTop: "1rem",
  },
  cardHeader: {
    fontFamily: "Archivo narrow",
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "#E81B7D",
    padding: "1rem",
  },
  header: {
    height: "17rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  restoName: {
    paddingTop: "2rem",
    marginBottom: "2rem",
  },
  logo: {
    width: "10rem",
  },
  inputLabel: {
    marginTop: "1rem",
  },
  colorInput: {
    width: "3rem",
    marginBottom: "1rem",
    marginLeft: "6rem",
  },
  fontInput: {
    fontFamily: menu && menu.fontFamily,
    minWidth: "10rem",
    marginBottom: "1rem",
    marginLeft: "1rem",
  },
  fontSizeInput: {
    width: "5rem",
    marginLeft: "4rem",
    marginBottom: "1rem",
  },
  police1: {
    fontFamily: "Archivo narrow",
  },
  police2: {
    fontFamily: "Great Vibes",
  },
  police3: {
    fontFamily: "Roboto",
  },
  police4: {
    fontFamily: "Lobster",
  },
  police5: {
    fontFamily: "Cinzel",
  },
  police6: {
    fontFamily: "Righteous",
  },
  police7: {
    fontFamily: "Aclonica",
  },
  police8: {
    fontFamily: "Barrio",
  },
  police9: {
    fontFamily: "Big Shoulders Stencil Text",
  },
  police10: {
    fontFamily: "Emilys Candy",
  },
  police11: {
    fontFamily: "Cabin Sketch",
  },
  police12: {
    fontFamily: "Cinzel decorative",
  },
  police13: {
    fontFamily: "Cookie",
  },
  police14: {
    fontFamily: "Cutive Mono",
  },
  police15: {
    fontFamily: "Delius Unicase",
  },
  police16: {
    fontFamily: "Emilys Candy",
  },
  police17: {
    fontFamily: "Fontdiner Swanky",
  },
  police18: {
    fontFamily: "Fredericka the Great",
  },
  police19: {
    fontFamily: "Kranky",
  },
  police20: {
    fontFamily: "Lexend Zetta",
  },
  police21: {
    fontFamily: "Lobster Two",
  },
  police22: {
    fontFamily: "Megrim",
  },
  police23: {
    fontFamily: "Monofett",
  },
  police24: {
    fontFamily: "Montserrat Subrayada",
  },
  police25: {
    fontFamily: "Pompiere",
  },
  police26: {
    fontFamily: "Princess Sofia",
  },
  police27: {
    fontFamily: "Sacramento",
  },
  police28: {
    fontFamily: "Sofia",
  },
  police29: {
    fontFamily: "Special Elite",
  },
});

const HeaderDesignForm = ({
  classes,
  restaurant,
  menu,
  selectHeaderColor,
  selectFontColor,
  selectFontFamily,
  selectFontSize,
}) => {
  let menuColor = menu && menu.headerColor;
  let resto = { ...restaurant };
  const [headerColor, setHeaderColor] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [fontSize, setFontSize] = useState("");
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

  const handleChangeFontSize = (e) => {
    setFontSize(e.target.value);
    selectFontSize({ menuId: menu.id, fontSize: e.target.value });
  };

  console.log("menu in design form", menu);

  return (
    <Card className={classes.root}>
      <form>
        <Typography className={classes.cardHeader}>L'entête</Typography>

        <div
          className={classes.header}
          style={{ backgroundColor: (menu && menu.headerColor) || "#272727" }}
        >
          <Typography
            className={classes.restoName}
            style={{
              color: (menu && menu.fontColor) || "#272727",
              fontFamily: (menu && menu.fontFamily) || "Roboto",
              fontSize: menu && menu.fontSize,
            }}
          >
            {resto.name}
          </Typography>
          <img className={classes.logo} src={restaurant.logo} alt="logo" />
        </div>

        <table className={classes.table}>
          <thead>
            <tr>
              <th>
                <Typography variant="body2" className={classes.inputLabel}>
                  Couleur de fond
                </Typography>
              </th>
              <th>
                <Typography variant="body2" className={classes.inputLabel}>
                  Couleur du texte
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                <ColorPicker
                  className={classes.colorInput}
                  style={{ backgroundColor: menuColor || headerColor }}
                  name="color"
                  defaultValue={headerColor}
                  value={headerColor}
                  onChange={handleChangeHeaderColor}
                />
              </td>
              <td align="center">
                <ColorPicker
                  className={classes.colorInput}
                  style={{
                    backgroundColor: (menu && menu.fontColor) || fontColor,
                  }}
                  name="color"
                  defaultValue={fontColor}
                  value={fontColor}
                  onChange={handleChangeFontColor}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table className={classes.table}>
          <thead>
            <tr>
              <th>
                <Typography variant="body2">Police d'écriture</Typography>
              </th>
              <th>
                <Typography variant="body2">Taille</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                <Select
                  className={classes.fontInput}
                  variant="outlined"
                  onChange={handleChangeFontFamily}
                  defaultValue="Roboto"
                  style={{ fontFamily: font }}
                >
                  <MenuItem
                    value={"Archivo narrow"}
                    className={classes.police1}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Great Vibes"} className={classes.police2}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Anton Roboto"} className={classes.police3}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Lobster"} className={classes.police4}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Cinzel"} className={classes.police5}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Righteous"} className={classes.police6}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Aclonica"} className={classes.police7}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Barrio"} className={classes.police8}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Big Shoulders Stencil Text"}
                    className={classes.police9}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Emilys Candy"} className={classes.police10}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Cabin Sketch"} className={classes.police11}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Cinzel Decorative"}
                    className={classes.police12}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Cookie"} className={classes.police13}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Cutive Mono"} className={classes.police14}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Delius Unicase"}
                    className={classes.police15}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Emilys Candy"} className={classes.police16}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Fontdiner Swanky"}
                    className={classes.police17}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Fredericka the Great"}
                    className={classes.police18}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Kranky"} className={classes.police19}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Lexend Zetta"} className={classes.police20}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Lobster Two"} className={classes.police21}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Magrim"} className={classes.police22}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Monofett"} className={classes.police23}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Montserrat Subrayada"}
                    className={classes.police24}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Pompiere"} className={classes.police25}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Princess Sofia"}
                    className={classes.police26}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Sacramento"} className={classes.police27}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Sofia"} className={classes.police28}>
                    {resto.name}
                  </MenuItem>
                  <MenuItem
                    value={"Special Elite"}
                    className={classes.police29}
                  >
                    {resto.name}
                  </MenuItem>
                  <MenuItem value={"Syncopate"} className={classes.police30}>
                    {resto.name}
                  </MenuItem>
                </Select>
              </td>
              <td align="center">
                <Select
                  className={classes.fontSizeInput}
                  variant="outlined"
                  onChange={handleChangeFontSize}
                  defaultValue={fontSize}
                >
                  <MenuItem value={"1.5rem"} className={classes.small}>
                    petit
                  </MenuItem>
                  <MenuItem value={"2rem"} className={classes.medium}>
                    moyen
                  </MenuItem>
                  <MenuItem value={"2.5rem"} className={classes.big}>
                    grand
                  </MenuItem>
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Card>
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
    selectFontSize: (menuId, fontSize) =>
      dispatch(selectFontSize(menuId, fontSize)),
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(HeaderDesignForm);
