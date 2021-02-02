import React from "react";
import Pdf from "react-to-pdf";
import { compose } from "redux";
import QrCode from "./QrCode";
import { withStyles } from "@material-ui/styles";
import { Button, Fab, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

const styles = (theme) => ({
  root: {
    alignItems: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
  },
  restoContainer: {
    paddingTop: "3rem",
  },

  downloadButton: {
    color: "#E81B7D",
    padding: "0, 1.5rem, 0, 1.5rem",
    marginTop: "2rem",
    marginBottom: "1rem",
    border: "1px solid #E81B7D",
    width: "60%",
  },
  orderButton: {
    backgroundColor: "#E81B7D",
    color: "white",
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  goBackButton: {
    marginTop: "6rem",
  },
  backArrow: {
    fill: "#E81B7D",
  },
  navButton: {
    marginRight: "60%",
  },
  navlink: {
    textDecoration: "none",
  }
});

const ref = React.createRef();

const QrCodePdf = ({ classes, match }) => {
  console.log("params", match.params);
  const restoId = match.params.resto;
  const menuId = match.params.menu;

  return (
    <div className={classes.root}>
      <NavLink to="/dashboard" className={classes.navButton}>
        <Fab size="small" className={classes.goBackButton}>
          <ArrowBackOutlinedIcon className={classes.backArrow} />
        </Fab>
      </NavLink>
      <div ref={ref} className={classes.restoContainer}>
        <QrCode restoId={restoId} menuId={menuId} />
      </div>
      <Pdf targetRef={ref} filename="qrmenu.pdf">
        {({ toPdf }) => (
          <Button className={classes.downloadButton} onClick={toPdf}>
            Télécharger PDF
          </Button>
        )}
      </Pdf>
      <Typography className={classes.ou}>Ou</Typography>
      <NavLink to="/shop" className={classes.navlink}>
        <Button className={classes.orderButton}>
          Commander des supports personnalisés
        </Button>
      </NavLink>
    </div>
  );
};

export default compose(withStyles(styles))(QrCodePdf);
