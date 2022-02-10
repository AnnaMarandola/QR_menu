const initialState = {
  dishes: [],
};
const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_DISH":
      return state;
    case "CREATE_DISH_ERROR":
      console.log("create dish error", action.err);
      return state;
    case "UPDATE_DISH":
      return state;
    case "UPDATE_DISH_ERROR":
      console.log("update dish error", action.err);
      return state;
    case "DELETE_DISH":
      return state;
    case "DELETE_DISH_ERROR":
      console.log("update dish error", action.err);
      return state;
    case "SWITCH_STATUS":
      return state;
    case "SWITCH_STATUS_ERROR":
      console.log("switch status error", action.err);
      return state;
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
    default:
      return state;
  }
};

export default dishReducer;
