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
import StartMenu from "./StartMenu";

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    backgroundColor: "white",
    marginTop: "1rem",
    padding: "1rem",
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 500,
    color: "#E81B7D",
  },
  cardButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  menuButtons: {
    width: "20rem",
    height: "3rem",
    padding: "0.5rem",
    backgroundColor: "#031627",
    margin: "0.2rem",
    fontFamily: "Archivo narrow",
    color: "white",
  },
  menuIcon: {
    fill: "#white",
    marginRight: "1rem",
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
          <Typography gutterBottom className={classes.cardTitle}>
            Ma carte
          </Typography>
          <CardContent>
            {restaurant && restaurant.menuId && restaurant.template ? (
              <div className={classes.cardButtons}>
                <NavLink
                  className={classes.links}
                  to={`/menuform/${restoId}/${menuId}`}
                >
                  <Button className={classes.menuButtons}>
                    {" "}
                    <EditRoundedIcon className={classes.menuIcon} />
                    Menu
                  </Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/design/${restoId}/${menuId}`}
                >
                  <Button className={classes.menuButtons}>
                    <EditRoundedIcon className={classes.menuIcon} />
                    Design
                  </Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/menupage/${restoId}/${menuId}`}
                >
                  <Button className={classes.menuButtons}>
                    <VisibilityIcon className={classes.menuIcon} />
                    Consulter
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
