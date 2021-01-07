import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Fade, withStyles } from "@material-ui/core";
import { compose } from "redux";
import MENU from "../../assets/menu-icon.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { NavLink } from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundColor: "white",
    height: "90%",
    width: "100%",
    "& span": {
      boxSizing: "none",
      height: "54px",
      width: "54px",
      borderRadius: "32px",
      overflow: "hidden",
      "& img": {
        objectFit: "cover",
        height: "100%",
      },
    },
  },
  navlink: {
    textDecoration: "none",
    width: "100%",
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
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    fontFamily: "Archivo narrow",
    fontSize: "1.5em",
    fontWeight: 300,
    lineHeight: "2em",
    backgroundColor: "white",
    color: "Black",
    paddingLeft: 0,
    paddingRight: "50px",
    borderTop: "1px solid lightgrey",
    "&:nth-of-type(1)": {
      borderTop: "none",
    },
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      backgroundColor: "white",
    },
    "&:focus": {
      backgroundColor: "white",
    },
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
    },
  },
}))(MenuItem);

function MobileMenu({ classes }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.root}
      >
        <img src={MENU} alt="undefined" />
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
        <AnchorLink offset={() => 100} href="#product" className={classes.navlink}>
          <StyledMenuItem>Produits</StyledMenuItem>
        </AnchorLink>
        <AnchorLink  offset={() => 100} href="#pricing" className={classes.navlink}>
          <StyledMenuItem>Abonnements</StyledMenuItem>
        </AnchorLink>
        <AnchorLink offset={() => 100} href="#engagements" className={classes.navlink}>
          <StyledMenuItem>Nos engagements</StyledMenuItem>
        </AnchorLink>
        <AnchorLink href="#contact" className={classes.navlink}>
          <StyledMenuItem>Contact</StyledMenuItem>
        </AnchorLink>
        <NavLink to="./signin" className={classes.navlink}>
          <StyledMenuItem>Connexion</StyledMenuItem>
        </NavLink>
      </StyledMenu>
    </React.Fragment>
  );
}

export default compose(withStyles(styles))(MobileMenu);
