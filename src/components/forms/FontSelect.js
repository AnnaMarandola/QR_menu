import { MenuItem, Select, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { selectFontFamily } from "../../store/actions/menuActions";

const styles = (theme, menu) => ({
  fontForm: {
    width: "15rem",
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

const SelectFont = ({ menu, restaurant, classes, selectFontFamily }) => {
  const resto = { ...restaurant };
  const menuId = menu && menu.id;

  const [font, setFont] = useState("Roboto");

  const handleChange = (e) => {
    setFont(e.target.value);
  };

  const handleSubmit = (e) => {
    selectFontFamily({ menuId: menuId, fontFamily: font });
  };

  return (
    <div>
      <form className={classes.fontForm}>
        <Typography variant="body2">Police d'écriture</Typography>
        <Select
          className={classes.fontInput}
          variant="outlined"
          onChange={handleChange}
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
        <Button onClick={handleSubmit}>Valider</Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectFontFamily: (menuId, fontFamily) =>
      dispatch(selectFontFamily(menuId, fontFamily)),
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(SelectFont);
