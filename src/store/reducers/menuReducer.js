const initialState = {
    menus: [
    ],
  };
  const menuReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_MENU":
        console.log("created menu", action.menu);
        return state;
      case "CREATE_MENU_ERROR":
        console.log("create menu error", action.err);
        return state;
    //   case "UPDATE_RESTAURANT":
    //     console.log("update restaurant success", action.restaurant);
    //     return state;
    //   case "UPDATE_RESTAURANT_ERROR":
    //     console.log("update restaurant error", action.err);
    //     return state;
      default:
        return state;
    }
  };
  
  export default menuReducer;
  