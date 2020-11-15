import React from "react";
import {
  Typography,
  Button,
  Card,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import TEMP1 from "../../assets/templates/snapshotTemp1.png";
import TEMP2 from "../../assets/templates/snapshotTemp2.png";
import TEMP3 from "../../assets/templates/snapshotTemp3.png";


const styles = (theme) => ({

  root: {
    backgroundColor: 'white',
    maxWidth: 345,
    marginTop: '1rem',
  },
  media: {
    height: 140,
  },
  templatePic: {
    width: '40%',
    marginLeft: '30%'
  },
  modifyButton: {
    backgroundColor: theme.palette.primary.orange,
    padding: '0, 1.5rem, 0, 1.5rem',
    color: theme.palette.primary.whiteish,
    margin: '0.5rem',
  },
  links: {
    textDecoration: 'none',
  }, 
});

const RestaurantSummary = ({ restaurant, classes }) => {
  const { template } = restaurant || false;

  const getImage = (template) => {
  if(template === "template1"){
    return TEMP1
  }  
  if(template === "template2"){
    return TEMP2
  }
  if(template === "template3"){
    return TEMP3
  }
  else {return null}
}


  return (
    <div>
    { restaurant &&
      <Card className={classes.root}>
          <Typography gutterBottom variant="h5">
            Design 
          </Typography>
          <img className={classes.templatePic} src={getImage(template)} alt="modele" />
            <Typography gutterBottom variant="h5">
              {restaurant.template}
            </Typography>
          <NavLink className={classes.links} to="/templatechoice">
            <Button className={classes.modifyButton}>
              Modifier
            </Button>
          </NavLink>
      </Card>
    }
    </div>
  )
};

export default withStyles(styles)(RestaurantSummary);
