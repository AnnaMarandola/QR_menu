import authReducer from "./authReducer";
import restaurantReducer from "./restaurantReducer";
import menuReducer from "./menuReducer";
import dishReducer from "./dishReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootreducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuReducer,
  dish: dishReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootreducer;
