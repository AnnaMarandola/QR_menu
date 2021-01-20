import React, { useState } from "react";
import ColorPicker from "material-ui-color-picker";
import {
  withStyles,
  Typography,
  MenuItem,
  Select,
  Card,
  CardHeader,
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

  return (
      <Card className={classes.root}>
        <form>
        <Typography className={classes.cardHeader}>
        L'entête
      </Typography>


        <div
        className={classes.header}
        style={{ backgroundColor: (menu && menu.headerColor) || "#272727" }}
      >
        <Typography
          className={classes.restoName}
          variant="h1"
          style={{
            color: (menu && menu.fontColor) || "#272727",
            fontFamily: (menu && menu.fontFamily) || "Roboto",
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
                    <Typography variant="body2"className={classes.inputLabel}>Couleur de fond</Typography>
                  </th>
                  <th>
                    <Typography variant="body2" className={classes.inputLabel}>Couleur du texte</Typography>
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
                      <MenuItem
                        value={"Great Vibes"}
                        className={classes.police2}
                      >
                        {resto.name}
                      </MenuItem>
                      <MenuItem
                        value={"Anton Roboto"}
                        className={classes.police3}
                      >
                        {resto.name}
                      </MenuItem>
                      <MenuItem value={"Lobster"} className={classes.police4}>
                        {resto.name}
                      </MenuItem>
                    </Select>
                  </td>
                  <td align="center">
                  <Select
              className={classes.fontSizeInput}
              variant="outlined"
              onChange={handleChangeFontSize}
              defaultValue="Roboto"
            >
              <MenuItem value={"small"} className={classes.small}>
                petit
              </MenuItem>
              <MenuItem value={"medium"} className={classes.medium}>
                moyen
              </MenuItem>
              <MenuItem value={"big"} className={classes.big}>
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
