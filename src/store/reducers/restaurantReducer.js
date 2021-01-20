const initialState = {
  restaurants: [],
  uploadProgress: null,
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
    case "UPDATE_RESTAURANT_MENU":
      console.log("update restaurant menu success", action.restaurant);
      return state;
    case "UPDATE_RESTAURANT_MENU_ERROR":
      console.log("update restaurant menu error", action.err);
      return state;
    case "EDIT_RESTAURANT":
      console.log("edit restaurant success", action.restaurant);
      return state;
    case "EDIT_RESTAURANT_ERROR":
      console.log("edit restaurant error", action.err);
      return state;
    case "UPLOAD_PROGRESS":
      return {
        ...state,
        uploadProgress: action.progress,
      };
    case "UPLOAD_ERROR":
      console.log("upload error");
      console.log(action.err);
      return {
        ...state,
        authError: action.err,
      };
    case "UPLOAD_COMPLETE":
      console.log("upload complete");
      return {
        ...state,
        uploadProgress: null,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
