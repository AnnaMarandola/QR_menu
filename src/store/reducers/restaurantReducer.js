const initialState = {
  restaurants: [
  ],
};
const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RESTAURANT":
      console.log("created restaurant", action.restaurant);
      return state;
    case "CREATE_RESTAURANT_ERROR":
      console.log("create restaurant error", action.err);
      return state;
    case "UPDATE_RESTAURANT":
      console.log("update restaurant success", action.restaurant);
      return state;
    case "UPDATE_RESTAURANT_ERROR":
      console.log("update restaurant error", action.err);
      return state;
    default:
      return state;
  }
};

export default restaurantReducer;
