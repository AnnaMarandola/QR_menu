import React from "react";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import ImageEdit from "./ImageEdit";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
});


function Gallery({ classes, restaurant }) {
  const images = restaurant.carousel;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            Vos photos :
          </ListSubheader>
        </GridListTile>
        {restaurant &&
          images &&
          images.map((image, id) => (
            <GridListTile key={id}>
              <img src={image} alt="le restaurant" />
              <GridListTileBar
                // title={tile.title}
                // subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton
                    // aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                  >
                    <ImageEdit image={image} carousel={restaurant.carousel} restoId={restaurant.id} key={image.id} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}

export default compose(withStyles(styles))(Gallery);
