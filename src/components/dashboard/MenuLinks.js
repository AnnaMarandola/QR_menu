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
    maxWidth: 325,
    minWidth: 325,
    backgroundColor: "white",
    marginTop: "3rem",
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "1rem",
    }
  },
  cardTitle: {
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 500,
    // color: "#FE4A49",
  },
  cardButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1rem",
  },
  menuButtons: {
    width: "18rem",
    height: "2rem",
    padding: "0.5rem",
    margin: "0.2rem",
    marginBottom: "1.5rem",
    fontFamily: "Archivo narrow",
    border: "solid 1px #FE4A49",
    color: "#FE4A49",
  },
  menuButton: {
    width: "18rem",
    height: "2rem",
    padding: "0.5rem",
    margin: "0.2rem",
    marginBottom: "1.5rem",
    fontFamily: "Archivo narrow",
    backgroundColor: "#FE4A49",
    color: "white",
  },
  firstMenuIcon: {
    fill: "white",
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
                  <Button className={classes.menuButton}>
                    {" "}
                    <EditRoundedIcon className={classes.firstMenuIcon} />
                    gérer mon menu
                  </Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/design/${restoId}/${menuId}`}
                >
                  <Button className={classes.menuButtons}>
                    <EditRoundedIcon className={classes.menuIcon} />
                    personnaliser mon design
                  </Button>
                </NavLink>

                <NavLink
                  className={classes.links}
                  to={`/menupage/${restoId}/${menuId}`}
                >
                  <Button className={classes.menuButtons}>
                    <VisibilityIcon className={classes.menuIcon} />
                    consulter ma carte en ligne
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
