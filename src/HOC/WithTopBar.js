import React from 'react'
import Navbar from '../components/nav/Navbar'

export default (ComposedComponent) => (props) => (
  <React.Fragment>
    <Navbar history={props.history} />
    <ComposedComponent {...props} />
  </React.Fragment>
)
