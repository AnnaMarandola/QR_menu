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
    minWidth: 345,
    backgroundColor: 'white',
    marginTop: "1rem",
  },
  media: {
    height: 140,
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  
  modifyButton: {
    backgroundColor: theme.palette.primary.orange,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
    marginRight: "1rem"
  },
  showButton: {
    backgroundColor: theme.palette.primary.main,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
    marginRight: "1rem"

  },
  qrcodeButton: {
    backgroundColor: theme.palette.primary.red,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
    width: "5rem"
  },
  links: {
    textDecoration: 'none',
  }, 
});

const MenuChipSet = ({ restaurant, classes, menuId }) => {
  const restoId = restaurant && restaurant.id 

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <Typography gutterBottom variant="h5">
            Ma carte
          </Typography>
          <CardContent className={classes.cardButtons}>
          { restaurant && restaurant.template ?
          <div>
          <NavLink className={classes.links} to={`/menuform/${restoId}/${menuId}`}>
          <Button className={classes.modifyButton}>Modifier</Button>
          </NavLink>
          
          <NavLink className={classes.links} to={`/menupage/${restoId}/${menuId}`}>
          <Button className={classes.showButton}>Consulter</Button>
          </NavLink>

          <NavLink className={classes.links} to={`/qrcode/${restoId}/${menuId}`}>
          <Button className={classes.qrcodeButton}>QR CODE</Button>
          </NavLink>
          </div>
          : <div>
          <NavLink className={classes.links} to='/templatechoice'>
          <Button className={classes.showButton}>Choisir un design</Button>
          </NavLink>
          </div>}
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(MenuChipSet);
