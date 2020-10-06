import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const Menu = (props) => {
  return (
    <div>
      <ul>
        <li>
          <a onClick={props.signOut} href="logout">
            Déconnexion
          </a>
        </li>
        <li>
          <NavLink to="./myaccount">Mon compte</NavLink>
        </li>
        <li>
          <NavLink to="./signin">Log in</NavLink>
        </li>
        <li>
          <NavLink to="./inforesto">Ma carte en ligne</NavLink>
        </li>
        <li>
          <NavLink to="./inforesto">Modifier ma carte</NavLink>
        </li>
      </ul>
    </div>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(Menu);
