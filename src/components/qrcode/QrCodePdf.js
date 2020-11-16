import React from "react";
import { connect } from "react-redux";
import Pdf from "react-to-pdf";
import { compose } from "redux";
import QrCode from "./QrCode";
import { firestoreConnect } from "react-redux-firebase";
import { withStyles } from "@material-ui/styles";
import { Button, Typography } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    width: "50%",
    marginLeft: "25%",
  },
  restoContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  restoName: {
    color: theme.palette.primary.red,
    margin: "2rem",
    paddingTop: "4rem",
  },
  qrcodeLabel: {
    color: theme.palette.primary.red,
    marginTop: "4rem",
  },
  downloadButton: {
    backgroundColor: theme.palette.primary.red,
    padding: "0, 1.5rem, 0, 1.5rem",
    color: theme.palette.primary.whiteish,
    marginTop: "2rem"
  },
});

const ref = React.createRef();

const QrCodePdf = ({ classes, match, restaurant }) => {
  console.log("params", match.params);
  const resto = { ...restaurant };
  const restoId = match.params.resto;
  const menuId = match.params.menu;

  return (
    <div className={classes.root}>
      <div ref={ref} className={classes.restoContainer}>
        <Typography variant="h2" className={classes.restoName}>
          {resto.name}
        </Typography>
        <img src={resto.logo} width="40%" alt="logo resto" />
        <h1 className={classes.qrcodeLabel}>La carte</h1>
        <QrCode restoId={restoId} menuId={menuId} />
      </div>
      <Pdf targetRef={ref} filename="qrmenu.pdf">
        {({ toPdf }) => (
          <Button className={classes.downloadButton} onClick={toPdf}>
            Télécharger PDF
          </Button>
        )}
      </Pdf>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    restaurant:
      state.firestore.ordered.restaurants &&
      state.firestore.ordered.restaurants[0],
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "restaurants",
      doc: props.match.params.resto,
    },
  ])
)(QrCodePdf);
