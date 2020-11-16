import React from 'react';
import { withStyles } from "@material-ui/styles";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "white",

  },
  templateImg: {
      width: "50%",
      alignContent: "center"
  },
  cardSection: {
      display: "flex",
  },
  buttonSection: {
      display: "flex"
  }
});


const TemplateCard = ({classes, templateImg, templateText, templateTitle}) => {

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardSection}>
        <CardMedia
        className={classes.templateImg}
          component="img"
          alt="La carte complète"
          height="260"
          image={templateImg}
          title="La carte complète"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {templateTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {templateText}
          </Typography>
        <Button size="small" color="primary">
          voir une démo
        </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(TemplateCard);
