import { withStyles, Button } from "@material-ui/core";
import React from "react";
import { compose } from "redux";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ArrowUpwardSharpIcon from "@material-ui/icons/ArrowUpwardSharp";

const styles = (theme) => ({
  backToTopButton: {
    borderRadius: "50%",
    height: "4rem",
    marginLeft: "80%",
    "&hover": {
      border: "solid 1px #ee1c80",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "95%",
    },
  },
});

const backToTopButton = ({ classes }) => {
  return (
    <div>
      <AnchorLink offset={() => 10000} href="#top" className={classes.navlink}>
        <Button className={classes.backToTopButton}>
          <ArrowUpwardSharpIcon style={{ color: "#ee1c80" }} />
        </Button>
      </AnchorLink>
    </div>
  );
};

export default compose(withStyles(styles))(backToTopButton);
