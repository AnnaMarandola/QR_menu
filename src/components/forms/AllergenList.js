import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    backgroundColor: 'white',
  },
  heading: {

  },
}));

function AllergenList() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log("checked", checked)

  return (
    <div className={classes.root}>
      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>allergènes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sélectionnez les allergènes présents dans ce plat
          </Typography>
          <List >
            {[
              "celeri",
              "crustace",
              "poisson",
              "gluten",
              "lupin",
              "lait",
              "molusque",
              "moutarde",
              "fruits-a-coques",
              "cacahuette",
              "sesame",
              "sulfites",
              "soja",
            ].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${value}`}
                      src={require(`../../assets/allergens/${value}.png`)}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={` ${value}`} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AllergenList;
