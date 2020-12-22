import React from "react";
import Pdf from "react-to-pdf";
import { compose } from "redux";
import QrCode from "./QrCode";
import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    alignItems: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"

  },
  restoContainer: {
    paddingTop: "9rem",
  },

  downloadButton: {
    backgroundColor: theme.palette.primary.red,
    padding: "0, 1.5rem, 0, 1.5rem",
    color: theme.palette.primary.whiteish,
    marginTop: "2rem",
    width: "60%",
  },
});

const ref = React.createRef();

const QrCodePdf = ({ classes, match }) => {
  console.log("params", match.params);
  const restoId = match.params.resto;
  const menuId = match.params.menu;

  return (
    <div className={classes.root}>
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
    </div>
  );
};



export default compose(
  withStyles(styles),
)(QrCodePdf);
