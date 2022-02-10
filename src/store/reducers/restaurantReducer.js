const initialState = {
  restaurants: [],
  uploadProgress: null,
};
const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RESTAURANT":
      return state;
    case "CREATE_RESTAURANT_ERROR":
      console.log("create restaurant error", action.err);
      return state;
    case "UPDATE_RESTAURANT":
      return state;
    case "UPDATE_RESTAURANT_ERROR":
      console.log("update restaurant error", action.err);
      return state;
    case "UPDATE_RESTAURANT_MENU":
      return state;
    case "UPDATE_RESTAURANT_MENU_ERROR":
      console.log("update restaurant menu error", action.err);
      return state;
    case "UPDATE_OPTIONS":
      return state;
    case "UPDATE_OPTIONS_ERROR":
      console.log("update options error", action.err);
      return state;
    case "EDIT_RESTAURANT":
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
      console.log("upload error", action.err);
      return {
        ...state,
        authError: action.err,
      };
    case "UPLOAD_COMPLETE":
      return {
        ...state,
        uploadProgress: null,
      };
    case "REMOVE_PICTURE":
      return state;
    case "REMOVE_PICTURE_ERROR":
      console.log("remove picture error", action.err);
      return state;
    default:
      return state;
  }
};

export default restaurantReducer;
