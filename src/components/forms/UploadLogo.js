import React, { Component } from "react";
import { Fab, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { uploadLogoPicture } from "../../store/actions/restaurantActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const styles = (theme) => ({
  imgContainer: {
    height: "100px",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
    "& img": {
      objectFit: "cover",
      height: "100%",
    },
    [theme.breakpoints.up("md")]: {
      height: "100px",
      marginRight: "2rem",
    },
  },
  uploadForm: {
    maxWidth: "200px",
    marginTop: "1rem",
    [theme.breakpoints.up("md")]: {
      maxWidth: "100px",
    },
  },
  inputfile: {
    display: "none",
  },
  uploadFab: {
    backgroundColor: "#fe4a49",
    marginBottom: "1rem",
  },
  uploadIcon: {
    fill: "white",
  },
});

const INITIAL_STATE = {
  file: null,
};
class UploadLogo extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.restaurant.logo) {
      this.setState({ file: this.props.restaurant.logo });
    } else {
      this.setState({ file: "https://via.placeholder.com/300x150" });
    }
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    this.props.uploadLogoPicture(
      event.target.files[0],
      this.props.restaurant.id
    );
    toast.info("upload en cours ...", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  render() {
    const { classes, restaurant } = this.props;
    return (
      <div>
        <div className={classes.imgContainer}>
          {restaurant && restaurant.logo ? (
            <img src={restaurant.logo} alt="logo" />
          ) : (
            <img src="https://via.placeholder.com/300x150" alt="avatar" />
          )}
        </div>

        <label htmlFor="file">
          <input
            type="file"
            id="file"
            className={classes.inputfile}
            onChange={this.handleChange}
          />
          <Fab
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
            className={classes.uploadFab}
          >
            <AddPhotoAlternateIcon className={classes.uploadIcon} />
            {/* {restaurant.logo ? "modifier" : "ajouter"} */}
          </Fab>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    progress: state.auth.uploadProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadLogoPicture: (file, restoId) =>
      dispatch(uploadLogoPicture(file, restoId)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(UploadLogo);
