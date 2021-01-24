// import React from "react";
// import { compose } from "redux";
// import { Typography, withStyles } from "@material-ui/core";
// import AnchorLink from "react-anchor-link-smooth-scroll";
// import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

// const styles = (theme) => ({
//   rootNav: {
//     // display: "none",
//     // [theme.breakpoints.up("sm")]: {
//     //   display: "flex",
//     //   height: "5rem",
//     //   borderBottom: "1px solid grey",
//     // },
//   },
//   homeNav: {
//     // display: "flex",
//     // justifyContent: "flex-end",
//     // alignItems: "center",
//     // width: "100%",
//   },
//   menuIcon: {
//     fill: "white",
//   },
//   menuItem: {
//     marginRight: "2rem",
//     fontFamily: "Archivo narrow",
//     fontSize: "1.5rem",
//     fontWeight: "300",
//     fontColor: "grey",
//   },
//   navlink: {
//     textDecoration: "none",
//     color: "inherit",
//   },
// });

// const RestoNav = ({ classes }) => {
//   return (
//     <div className={classes.rootNav}>
//       <MenuOutlinedIcon className={classes.menuIcon} />
//       <div className={classes.homeNav}>
//         <AnchorLink href="#menu" className={classes.navlink}>
//           <Typography className={classes.menuItem}>LA CARTE</Typography>
//         </AnchorLink>
//         <AnchorLink href="#infos-contact" className={classes.navlink}>
//           <Typography className={classes.menuItem}>INFOS & CONTACT</Typography>
//         </AnchorLink>
//         <AnchorLink href="#infos-allergens" className={classes.navlink}>
//           <Typography className={classes.menuItem}>INFO ALLERGENES</Typography>
//         </AnchorLink>
//       </div>
//     </div>
//   );
// };

// export default compose(withStyles(styles))(RestoNav);

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
    left: "17rem",
    // top: "-3rem",
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
