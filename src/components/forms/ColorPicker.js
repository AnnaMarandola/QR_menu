import React, { useState } from "react";
import ColorPicker from "material-ui-color-picker";
import { Button, withStyles,Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { selectHeaderColor, selectFontColor } from "../../store/actions/menuActions";

const styles = (theme) => ({
  colorInput: {
    width: '4rem',
  },
});

const SelectColor = ({ classes, menu, selectHeaderColor, selectFontColor }) => {
  let menuColor = menu && menu.headerColor
  const [headerColor, setHeaderColor] = useState("");
  const [fontColor, setFontColor] = useState("");

  const handleChangeHeaderColor = (color) => {
    setHeaderColor(color);
    console.log("headerColor", headerColor);
  };

  const handleChangeFontColor = (color) => {
    setFontColor(color);
    console.log("fontColor", fontColor);
  };

  const submitHeaderColor = (e) => {
    e.preventDefault();
    selectHeaderColor({ menuId: menu.id, color: headerColor });
  };

  const submitFontColor = (e) => {
    e.preventDefault();
    selectFontColor({ menuId: menu.id, fontColor: fontColor });
  };



  return (
    <div>
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
        { headerColor !== menuColor &&
        <Button onClick={submitHeaderColor}>valider</Button>
        }
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
        { headerColor !== menuColor &&
        <Button onClick={submitFontColor}>valider</Button>
        }
        
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectHeaderColor: (menuId, color) => dispatch(selectHeaderColor(menuId, color)),
    selectFontColor: (menuId, fontColor) => dispatch(selectFontColor(menuId, fontColor))
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SelectColor);
