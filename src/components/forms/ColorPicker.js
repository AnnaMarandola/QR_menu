import React, { useState } from "react";
import ColorPicker from "material-ui-color-picker";
import { Button, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { selectColor } from "../../store/actions/menuActions";

const styles = (theme) => ({
  colorInput: {
    width: '4rem',
  },
});

const SelectColor = ({ classes, menu, selectColor }) => {
  let menuColor = menu && menu.headerColor
  const [headerColor, setHeaderColor] = useState("");

  const handleChange = (color) => {
    setHeaderColor(color);
    console.log("headerColor", headerColor);
  };

  const setColor = (e) => {
    e.preventDefault();
    selectColor({ menuId: menu.id, color: headerColor });
  };

  return (
    <div>
      <form className={classes.colorForm}>
        <ColorPicker
          className={classes.colorInput}
          style={{ backgroundColor: menuColor || headerColor }}
          name="color"
          defaultValue={headerColor}
          value={headerColor}
          onChange={handleChange}
        />
        { headerColor !== menuColor &&
        <Button onClick={setColor}>valider</Button>
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
    selectColor: (menuId, color) => dispatch(selectColor(menuId, color)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SelectColor);
