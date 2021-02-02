import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Backdrop} from '@material-ui/core'
import  LOGO  from '../assets/logoIcon.png'

const useStyles = makeStyles (theme => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#f8f8f8',
    color: '#f8f8f8',
  },
  spinner: {
    width: "50%",
  }
}))

export default function Loading () {
  const classes = useStyles ()

  return (
    <Backdrop className={classes.backdrop} open>
      <img
        src={LOGO}
        alt="boussole loader"
        className={classes.spinner}
      />
    </Backdrop>
  )
}