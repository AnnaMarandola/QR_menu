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
  },
  qrImg: {
    width: "60%",
    margin: "4 rem",
    border: "solid 6px",
    borderColor: theme.palette.primary.main,
    borderRadius: "10px",
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

const QrCode = ({classes, restoId, menuId}) => {
  const url = `https://qrmenu-64802.web.app/menupage/${restoId}/${menuId}`;
  const qrCode = useQrCode(url, options);
  return (
    <div className={classes.root}>
      <img alt="qr code" src={qrCode} className={classes.qrImg} />
    </div>
  );
};

export default compose(withStyles(styles))(QrCode);
