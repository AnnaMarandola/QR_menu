import React from "react";
// import { history } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PropTypes from "prop-types"
import { Fade, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import  MENU  from "../../assets/menu-icon.png";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.whiteish,
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



function MyMenu({ classes, signOut, profile, history }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('MyMenu profile', profile)
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
        <StyledMenuItem onClick={() => history.push('/')}>
          Tableau de bord
        </StyledMenuItem>
        <StyledMenuItem onClick={() => history.push('/menupage')}>
          Ma carte en ligne
        </StyledMenuItem>
        <StyledMenuItem onClick={() => history.push('/shop')}>
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
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(MyMenu);
