import React from "react";
import useQrCode from "react-qrcode-hook";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "6rem",
  },
  download: {
    backgroundColor: "#f51735",
    color: "#F8F0D7",
    marginTop: "1rem",
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

const QrCode = (restoId) => {

  const url = `http://localhost:3000/menupage/${restoId.restoId}/${restoId.menuId}`;
  const classes = useStyles();
  const qrCode = useQrCode(url, options);
  return (
    <div className={classes.root}>
      <img alt="qr code" src={qrCode} />
    </div>
  );
};

export default QrCode;
