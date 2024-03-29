import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PropTypes from "prop-types";
import { Fade, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import MENU from "../../assets/menu-icon.png";
import { firestoreConnect } from "react-redux-firebase";

const styles = (theme) => ({
  root: {
    backgroundColor: "white",
    float: "right",
    top: "-4rem",
    height: "90%",
    width: "80px",
    "& span": {
      height: "54px",
      width: "54px",
      borderRadius: "32px",
      overflow: "hidden",
      "& img": {
        objectFit: "cover",
        height: "100%",
      },
    },
    [theme.breakpoints.down("xs")]: {
      boxSizing: "none",
    },
  },
  avatar: {
    backgroundSize: "cover",
    height: "100%",
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
      horizontal: "center",
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
    fontFamily: "Raleway",
    fontSize: "1.5em",
    fontWeight: 700,
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
      backgroundColor: theme.palette.common.white,
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

function MyMenu({
  classes,
  signOut,
  profile,
  history,
  auth,
  restaurant,
  menu,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const restoId = restaurant && restaurant.id;
  const menuId = menu && menu.id;

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
        <StyledMenuItem onClick={() => history.push("/dashboard")}>
          Tableau de bord
        </StyledMenuItem>
        { menu &&
        <StyledMenuItem
          onClick={() => history.push(`/menupage/${restoId}/${menuId}`)}
        >
          Ma carte en ligne
        </StyledMenuItem>
        }
        <StyledMenuItem onClick={() => history.push("/shop")}>
          Panier
        </StyledMenuItem>
        <StyledMenuItem onClick={signOut}>Déconnexion</StyledMenuItem>
      </StyledMenu>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
    menu: state.firestore.ordered.menus && state.firestore.ordered.menus[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

MyMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      where: ["ownerId", "==", props.auth.uid],
    },
    {
      collection: "menus",
      where: ["ownerId", "==", props.auth.uid],
    },
  ])
)(MyMenu);
