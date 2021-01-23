import React from "react";
import {
  Typography,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Card,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CropFreeIcon from "@material-ui/icons/CropFree";
import StartMenu from "./StartMenu";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    backgroundColor: "white",
    marginTop: "1rem",
    padding: "1rem",
  },
  cardButtons: {
    display: "flex",
    flexDirection: "column",
    height: "7rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  modifyButton: {
    border: "solid 1px #e81b7d",
    margin: "0.4rem",
    padding: "0.4rem",
    fontFamily: "Archivo narrow",
  },
  showButton: {
    margin: "0.4rem",
    padding: "0.4rem",
    border: "solid 1px grey",
    fontFamily: "Archivo narrow",
  },
  modifyIcon: {
    marginRight: "0.3rem",
    fill: "#E81B7D"
  },
  showIcon: {
    marginRight: "0.3rem",
    fill: "#82e3fb"
  },
  links: {
    textDecoration: "none",
  },
});

const MenuChipSet = ({ restaurant, classes, menuId }) => {
  const restoId = restaurant && restaurant.id;

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <Typography gutterBottom variant="h5">
            Ma carte
          </Typography>
          <CardContent>
            {restaurant && restaurant.menuId && restaurant.template ? (
              <div className={classes.cardButtons}>
                <NavLink
                  className={classes.links}
                  to={`/menuform/${restoId}/${menuId}`}
                >
                  <Button className={classes.modifyButton}>
                    {" "}
                    <EditRoundedIcon  className={classes.modifyIcon} />
                    Menu
                  </Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/design/${restoId}/${menuId}`}
                >
                  <Button className={classes.modifyButton}>
                    <EditRoundedIcon className={classes.modifyIcon} />
                    Design
                  </Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/menupage/${restoId}/${menuId}`}
                >
                  <Button className={classes.showButton}>
                    <VisibilityIcon className={classes.showIcon} />
                    Consulter
                  </Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/qrcode/${restoId}/${menuId}`}
                >
                  <Button className={classes.showButton}>
                    <CropFreeIcon className={classes.showIcon} />
                    QR CODE
                  </Button>
                </NavLink>
              </div>
            ) : (
              <div>
                <StartMenu restaurant={restaurant} />
              </div>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(MenuChipSet);
