const initialState = {
  menus: [],
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_MENU":
      return state;
    case "CREATE_MENU_ERROR":
      console.log("create menu error", action.err);
      return state;
    case "UPDATE_MENU":
      return state;
    case "UPDATE_MENU_ERROR":
      console.log("update menu error", action.err);
      return state;
    case "UPDATE_NEWCATEGORIES":
      return state;
    case "UPDATE_NEWCATEGORIES_ERROR":
      console.log("update category error", action.err);
      return state;
    case "SELECT_HEADER_COLOR":
      return state;
    case "SELECT_HEADER_COLOR_ERROR":
      console.log("select header color error", action.err);
      return state;
    case "SELECT_FONT_COLOR":
      return state;
    case "SELECT_FONT_COLOR_ERROR":
      console.log("select font color error", action.err);
      return state;
    case "SELECT_FONT_FAMILY":
      return state;
    case "SELECT_FONT_FAMILY_ERROR":
      console.log("select font family error", action.err);
      return state;
    case "SELECT_FONT_SIZE":
      return state;
    case "SELECT_FONT_SIZE_ERROR":
      console.log("select font size error", action.err);
      return state;
    case "SELECT_LOGO_SIZE":
      return state;
    case "SELECT_LOGO_SIZE_ERROR":
      console.log("select logo size error", action.err);
      return state;
    case "UPDATE_MENU_TEMPLATE":
      return state;
    case "UPDATE_MENU_TEMPLATE_ERROR":
      console.log("update menu template error", action.err);
      return state;
    case "UPDATE_MENU_FORMULA":
      return state;
    case "UPDATE_MENU_FORMULA_ERROR":
      console.log("update menu formula error", action.err);
      return state;
    default:
      return state;
  }
};

export default menuReducer;
