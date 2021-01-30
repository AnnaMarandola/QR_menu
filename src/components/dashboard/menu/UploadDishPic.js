import React, { Component } from "react";
import { Fab, withStyles } from "@material-ui/core";
import { compose } from "redux";
import {uploadDishPic} from "../../../store/actions/dishActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const styles = (theme) => ({
  inputfile: {
    display: "none",
  },
});

const INITIAL_STATE = {
  file: null,
};
class UploadDishPic extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    this.props.uploadDishPic(
      event.target.files[0],
      this.props.dish.id
    );
    toast.info("upload en cours ...", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.imgContainer}>

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
          >
            <AddPhotoAlternateIcon />
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
    uploadDishPic: (file, dishId) =>
      dispatch(uploadDishPic(file, dishId)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(UploadDishPic);
