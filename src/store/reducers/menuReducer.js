const initialState = {
  menus: [],
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_MENU":
      console.log("created menu", action.menu);
      return state;
    case "CREATE_MENU_ERROR":
      console.log("create menu error", action.err);
      return state;
    case "UPDATE_MENU":
      console.log("update menu success", action.menu);
      return state;
    case "UPDATE_MENU_ERROR":
      console.log("update menu error", action.err);
      return state;
    case "SELECT_HEADER_COLOR":
      console.log("select header color success", action.menu);
      return state;
    case "SELECT_HEADER_COLOR_ERROR":
      console.log("select header color error", action.err);
      return state;
    case "SELECT_FONT_COLOR":
      console.log("select font color success", action.menu);
      return state;
    case "SELECT_FONT_COLOR_ERROR":
      console.log("select font color error", action.err);
      return state;
    case "SELECT_FONT_FAMILY":
      console.log("select font family success", action.menu);
      return state;
    case "SELECT_FONT_FAMILY_ERROR":
      console.log("select font family error", action.err);
      return state;
      case "UPDATE_MENU_TEMPLATE":
        console.log("update menu template success", action.menu);
        return state;
      case "UPDATE_MENU_TEMPLATE_ERROR":
        console.log("update menu template error", action.err);
        return state;
        case "UPDATE_MENU_FORMULA":
          console.log("update menu formula success", action.menu);
          return state;
        case "UPDATE_MENU_FORMULA_ERROR":
          console.log("update menu formula error", action.err);
          return state;
    default:
      return state;
  }
};

export default menuReducer;
