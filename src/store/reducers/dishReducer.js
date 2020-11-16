const initialState = {
  dishes: [],
};
const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_DISH":
      console.log("created dish!", action.data);
      return state;
    case "CREATE_DISH_ERROR":
      console.log("create dish error", action.err);
      return state;
    case "UPDATE_DISH":
      console.log("update dish!", action.dish);
      return state;
    case "UPDATE_DISH_ERROR":
      console.log("update dish error", action.err);
      return state;
    case "DELETE_DISH":
      console.log("update dish success", action.dishId);
      return state;
    case "DELETE_DISH_ERROR":
      console.log("update dish error", action.err);
      return state;
    default:
      return state;
  }
};

export default dishReducer;
