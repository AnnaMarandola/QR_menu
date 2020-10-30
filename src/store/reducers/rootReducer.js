import authReducer from "./authReducer";
import restaurantReducer from "./restaurantReducer";
import menuReducer from "./menuReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootreducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootreducer;
