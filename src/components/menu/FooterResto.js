import React, { useState } from "react";
import { compose } from "redux";
import { withStyles } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import MAPMARKER from "../../assets/icons/mapm-marker.png";
import FACEBOOK from "../../assets/icons/facebook.png";
import INSTAGRAM from "../../assets/icons/instagrm.png";
import PHONE from "../../assets/icons/phone.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  contactLogo: {
    width: "30px",
  },
  mediaLogo: {
    width: "30px",
    marginTop: "0.5rem",
  },
  popperPaper: {
    backgroundColor: "white",
    padding: "1rem",
  }
});

const FooterResto = ({
  classes,
  adress,
  phone,
  facebook,
  instagram,
  postalCode,
  city,
}) => {
  const [anchorElAdress, setAnchorElAdress] = useState(null);
  const [openAdress, setOpenAdress] = useState(false);
  const [adressPlacement, setAdressPlacement] = useState();
  const [anchorElPhone, setAnchorElPhone] = useState(null);
  const [openPhone, setOpenPhone] = useState(false);
  const [phonePlacement, setPhonePlacement] = useState();

  const handleClickAdress = (newPlacement) => (event) => {
    setAnchorElAdress(event.currentTarget);
    setOpenAdress((prev) => adressPlacement !== newPlacement || !prev);
    setAdressPlacement(newPlacement);
  };

  const handleClickPhone = (newPlacement) => (event) => {
    setAnchorElPhone(event.currentTarget);
    setOpenPhone((prev) => phonePlacement !== newPlacement || !prev);
    setPhonePlacement(newPlacement);
  };

  return (
    <div className={classes.root}>
      <div>
        <Popper
          open={openAdress}
          anchorEl={anchorElAdress}
          placement={adressPlacement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.popperPaper}>
                <Typography className={classes.typography}>{adress}</Typography>
                <Typography className={classes.typography}>
                  {postalCode} - {city}
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Button onClick={handleClickAdress("top-start")}>
          <img
            className={classes.contactLogo}
            src={MAPMARKER}
            alt="map marker"
          />
        </Button>
      </div>

      <a href={instagram} target="_blank" rel="noopener noreferrer">
        <img
          className={classes.mediaLogo}
          src={INSTAGRAM}
          alt="instagram logo"
        />
      </a>

      <a href={facebook} target="_blank" rel="noopener noreferrer">
        <img className={classes.mediaLogo} src={FACEBOOK} alt="facebook logo" />
      </a>

      <div>
        <Popper
          open={openPhone}
          anchorEl={anchorElPhone}
          placement={phonePlacement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.popperPaper}>
                <Typography className={classes.typography}>{phone}</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Button onClick={handleClickPhone("top-end")}>
          <img
            className={classes.contactLogo}
            src={PHONE}
            alt="instagram logo"
          />
        </Button>
      </div>
    </div>
  );
};

export default compose(withStyles(styles))(FooterResto);
