import authReducer from "./authReducer";
import restaurantReducer from "./restaurantReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore';

const rootreducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  firestore: firestoreReducer
});

export default rootreducer;
