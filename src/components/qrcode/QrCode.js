import React from "react";
import useQrCode from "react-qrcode-hook";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";


const styles = (theme) => ({
  root: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: theme.palette.primary.main,
  },
  qrImg: {
    width: "30%",
    marginBottom: "4rem"
  },
});

const options = {
  margin: 5,
  scale: 7,
  color: {
    dark: "#031627",
    light: "#FDFFFC",
  },
};

const QrCode = ({classes, restoId}) => {
  const url = `http://localhost:3000/menupage/${restoId.restoId}/${restoId.menuId}`;
  const qrCode = useQrCode(url, options);
  return (
    <div className={classes.root}>
      <img alt="qr code" src={qrCode} className={classes.qrImg} />
    </div>
  );
};

export default compose(withStyles(styles))(QrCode);
