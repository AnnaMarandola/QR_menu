import React, {Component} from 'react'
import {withStyles} from '@material-ui/core'
import {compose} from 'redux'
import {uploadLogoPicture} from '../../store/actions/restaurantActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'




const styles = theme => ({
  root: {
    maxWidth: '200px',
    margin: '15% auto',
  },
  formContent: {
    width: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: '0 1rem',
    },
  },
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
    if(this.props.restaurant){
    this.setState({ file: this.props.restaurant.logo })
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
    const { classes, profile, restaurant } = this.props
    const { file } = this.state
    console.log("file in uploadLogo", restaurant && restaurant.logo)
    return (
      <div>
      <div className={classes.imgContainer}>
      { restaurant && restaurant.logo
          ? <img src={restaurant.logo} alt="logo"/>
          : <img src={file} alt="avatar" />
      }
    </div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formContent}>

          <div className="box">

               <label htmlFor="file" className={classes.button} id="SelectImageLabel">
                  Votre logo :
                </label>
            <input
              type="file"
              name="file"
              id="file"
              className={classes.inputfile}
              onChange={this.handleChange}
            />
          </div>

        </div>
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
