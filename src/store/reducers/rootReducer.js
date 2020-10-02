import authReducer from "./authReducer";
import restaurantReducer from "./restaurantReducer";
import { combineReducers } from "redux";

const rootreducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
});

export default rootreducer;
