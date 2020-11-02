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


const styles = (theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: 'white',

  },
  media: {
    height: 140,
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  modifyButton: {
    backgroundColor: theme.palette.primary.orange,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
  },
  showButton: {
    backgroundColor: theme.palette.primary.main,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
  },
  links: {
    textDecoration: 'none',
  }, 
});

const MenuChipSet = ({ restaurant, classes, menuId }) => {
  console.log("==============restaurant in menu link", restaurant)
  const restoId = restaurant && restaurant.id 
  console.log("==============menu in menu link", menuId)
  console.log("=============restoId in menulinks", restoId)
  console.log("==============menu in menulinks", menuId)

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <Typography gutterBottom variant="h5">
            Votre carte
          </Typography>
          <CardContent className={classes.cardButtons}>
          <NavLink className={classes.links} to={`/menuform/${menuId}`}>
          <Button className={classes.modifyButton}>Modifier</Button>
          </NavLink>
          
          <NavLink className={classes.links} to={`/menupage/${restoId}`}>
          <Button className={classes.showButton}>Consulter</Button>
          </NavLink>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(MenuChipSet);
