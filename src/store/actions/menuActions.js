export const createMenu = (menu) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const ownerId = getState().firebase.auth.uid;

    firestore
      .collection("menus")
      .add({
        ...menu,
        ownerId: ownerId,
        ownerRef: firestore.collection("users").doc(ownerId),
        createAt: new Date(),
        headerColor: "#031627",
        fontColor: "#fdfffc",
        fontFamily: "Roboto",
        fontSize: "1.5rem",
        logoSize: "9rem",
        categories: [ "entrées", "plats", "desserts"]
      })
      .then(() => {
        dispatch({ type: "CREATE_MENU", menu });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_MENU_ERROR", err });
      });
  };
};

export const updateMenu = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let title = payload.title;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ menuTitle: title })
      .then(() => {
        dispatch({ type: "UPDATE_MENU", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_MENU_ERROR", err });
      });
  };
};

export const updateCategory = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let newCategories = payload.newCategories;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ categories: newCategories })
      .then(() => {
        dispatch({ type: "UPDATE_NEWCATEGORIES", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_NEWCATEGORIES_ERROR", err });
      });
  };
};

export const selectHeaderColor = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let color = payload.color;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ headerColor: color })
      .then(() => {
        dispatch({ type: "SELECT_HEADER_COLOR", payload });
      })
      .catch((err) => {
        dispatch({ type: "SELECT_HEADER_COLOR_ERROR", err });
      });
  };
};

export const selectFontColor = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let color = payload.fontColor;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ fontColor: color })
      .then(() => {
        dispatch({ type: "SELECT_FONT_COLOR", payload });
      })
      .catch((err) => {
        dispatch({ type: "SELECT_FONT_COLOR_ERROR", err });
      });
  };
};

export const selectFontFamily = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let fontFamily = payload.fontFamily;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ fontFamily: fontFamily })
      .then(() => {
        dispatch({ type: "SELECT_FONT_FAMILY", payload });
      })
      .catch((err) => {
        dispatch({ type: "SELECT_FONT_FAMILY_ERROR", err });
      });
  };
};

export const selectFontSize = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let fontSize = payload.fontSize;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ fontSize: fontSize })
      .then(() => {
        dispatch({ type: "SELECT_FONT_SIZE", payload });
      })
      .catch((err) => {
        dispatch({ type: "SELECT_FONT_SIZE_ERROR", err });
      });
  };
};

export const selectLogoSize = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let logoSize = payload.logoSize;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ logoSize: logoSize })
      .then(() => {
        dispatch({ type: "SELECT_LOGO_SIZE", payload });
      })
      .catch((err) => {
        dispatch({ type: "SELECT_LOGO_SIZE_ERROR", err });
      });
  };
};

export const updateMenuTemplate = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let template = payload.template;
    let menuTitle = payload.menuTitle
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ template: template, menuTitle: menuTitle })
      .then(() => {
        dispatch({ type: "UPDATE_MENU_TEMPLATE", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_MENU_ERROR", err });
      });
  };
};

export const updateMenuFormula = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore()
      .collection("menus")
      .doc(payload.menuId)
      .update({
        formula1: payload.formula1,
        formula1Price: payload.formula1Price,
        formula1Comment: payload.formula1Comment,        
        formula2: payload.formula2,
        formula2Price: payload.formula2Price,
        formula2Comment: payload.formula2Comment,
      })
      .then(() => {
        dispatch({ type: "UPDATE_MENU_FORMULA", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_MENU_FORMULA_ERROR", err });
      });
  };
};
