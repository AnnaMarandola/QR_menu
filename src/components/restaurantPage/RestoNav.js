import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Fade, withStyles } from "@material-ui/core";
import { compose } from "redux";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import AnchorLink from "react-anchor-link-smooth-scroll";

const styles = (theme, menu) => ({
  root: {
    position: "relative",
  },
  menuIcon: {
      fontSize: "3rem",
  },
  navlink: {
    textDecoration: "none",
    color: "inherit",
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #bbb",
    borderRadius: 0,
    backgroundColor: "White",
    marginTop: "8px",
  },
  list: {
    padding: "10px 0 10px 50px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme, menu) => ({

  root: {
    fontFamily: "Archivo narrow",
    fontSize: "1.5em",
    fontWeight: 700,
    lineHeight: "2em",
    paddingLeft: 0,
    paddingRight: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}))(MenuItem);

function RestoNav({
  classes,
  menu,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("menu in nav+++++++", menu.headerColor)


  return (
    <React.Fragment>
      <Button
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.root}
      >
        <MenuOutlinedIcon style={{ fill: menu.fontColor}} className={classes.menuIcon} />
      </Button>
      <StyledMenu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        elevation={0}
      >
        <AnchorLink href="#menu" className={classes.navlink}>
          <StyledMenuItem>LA CARTE</StyledMenuItem>
        </AnchorLink>
        <AnchorLink href="#infoscontact" className={classes.navlink}>
          <StyledMenuItem>INFOS & CONTACT</StyledMenuItem>
        </AnchorLink>
        <StyledMenuItem>INFOS ALLERGENES</StyledMenuItem>
      </StyledMenu>
    </React.Fragment>
  );
}

export default compose(withStyles(styles))(RestoNav);
