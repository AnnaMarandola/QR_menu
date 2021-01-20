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
import StartMenu from "./StartMenu";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    backgroundColor: "white",
    marginTop: "1rem",
    padding: "1rem",
  },
  media: {
    height: 140,
  },
  cardButtons: {
    display: "flex",
    justifyContent: "center",
  },

  modifyButton: {
    backgroundColor:"#E81B7D",
    padding: "0, 1.5rem, 0, 1.5rem",
    color: theme.palette.primary.whiteish,
    marginRight: "1rem",
  },
  qrcodeButton: {
    backgroundColor: theme.palette.primary.red,
    padding: "0, 1.5rem, 0, 1.5rem",
    color: theme.palette.primary.whiteish,
    width: "5rem",
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
          <CardContent className={classes.cardButtons}>
            {restaurant && restaurant.menuId && restaurant.template ? (
              <div>
                <NavLink
                  className={classes.links}
                  to={`/menuform/${restoId}/${menuId}`}
                >
                  <Button className={classes.modifyButton}>Menu</Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/design/${restoId}/${menuId}`}
                >
                  <Button className={classes.modifyButton}>Design</Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/menupage/${restoId}/${menuId}`}
                >
                  <Button className={classes.showButton}>Consulter</Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/qrcode/${restoId}/${menuId}`}
                >
                  <Button className={classes.qrcodeButton}>QR CODE</Button>
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
