import React, {Component} from 'react'
import {withStyles} from '@material-ui/core'
import {compose} from 'redux'
import {uploadLogoPicture} from '../../store/actions/restaurantActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const styles = theme => ({
  imgContainer: {
    height: '200px',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    overflow: 'hidden',
    '& img': {
      objectFit: 'cover',
      height: '100%',
    },
  },
  uploadForm: {
    maxWidth: '200px',
    marginTop: "1rem",
  },
})

const INITIAL_STATE = {
    file: null,
  }
class UploadLogo extends Component {
  constructor (props) {
    super (props)
    this.state = INITIAL_STATE

    this.handleChange = this.handleChange.bind (this)
  }

  componentDidMount(){
    if(this.props.restaurant.logo){
    this.setState({ file: this.props.restaurant.logo })
    } else {
      this.setState({ file: "https://via.placeholder.com/300x150"})
    }
  }

  handleChange (event) {
    this.setState ({
      file: URL.createObjectURL(event.target.files[0]),
    })
    this.props.uploadLogoPicture(
      event.target.files[0],
      this.props.restaurant.id,
    )
  }

  render () {
    const { classes, restaurant } = this.props
    const { file } = this.state
    console.log("file in uploadLogo", restaurant && restaurant.logo)
    return (
      <div>
      <div className={classes.imgContainer}>
      { restaurant && restaurant.logo
          ? <img src={restaurant.logo} alt="logo"/>
          : <img src="https://via.placeholder.com/300x150" alt="avatar" />
      }
    </div>
      <form className={classes.uploadForm} noValidate autoComplete="off">
            <input
              type="file"
              name="file"
              id="file"
              className={classes.inputfile}
              onChange={this.handleChange}
            />
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    progress: state.auth.uploadProgress,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadLogoPicture: (file, restoId) =>
      dispatch (uploadLogoPicture (file, restoId)),
  }
}

UploadLogo.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
}

export default compose (
  withStyles (styles),
  connect (mapStateToProps, mapDispatchToProps)
) (UploadLogo)
