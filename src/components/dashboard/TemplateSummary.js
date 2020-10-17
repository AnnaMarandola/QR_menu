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
    maxWidth: 345,
    marginTop: '1rem'
  },
  media: {
    height: 140,
  },
  templatePic: {
    width: '40%',
    marginLeft: '30%'
  }
});

const RestaurantSummary = ({ restaurant, classes }) => {
  const { template } = restaurant;

  const getImage = (template) => {
  if(template === "template1"){
    return TEMP1
  }  
  if(template === "template2"){
    return TEMP2
  }
  if(template === "template"){
    return TEMP3
  }
  else {return null}
}


  return (
    <div>
      <Card className={classes.root}>
          <Typography gutterBottom variant="h5">
            Modèle choisi :
          </Typography>
          <img className={classes.templatePic} src={getImage(template)} alt="modele" />
            <Typography gutterBottom variant="h5">
              {restaurant.template}
            </Typography>
          <NavLink to="/templatechoice">
            <Button size="small" color="primary">
              Modifier
            </Button>
          </NavLink>
      </Card>
    </div>
  );
};

export default withStyles(styles)(RestaurantSummary);
