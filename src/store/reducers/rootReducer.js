import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import restaurantReducer from "./restaurantReducer";
import menuReducer from "./menuReducer";
import dishReducer from "./dishReducer";
import messageReducer from "./messageReducer";

const rootreducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuReducer,
  dish: dishReducer,
  message: messageReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootreducer;
