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
        fontFamily: "Roboto"
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
      .update({ title: title })
      .then(() => {
        dispatch({ type: "UPDATE_MENU", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_MENU_ERROR", err });
      });
  };
};

export const selectHeaderColor = (payload) => {
  console.log("payload in select color ACTION", payload);
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
  console.log("payload in select color ACTION", payload);
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
  console.log("payload in select fontFamily ACTION", payload);
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

export const updateMenuTemplate = (payload) => {
  console.log("payload in select fontFamily ACTION", payload);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuId = payload.menuId;
    let template = payload.template;
    getFirestore()
      .collection("menus")
      .doc(menuId)
      .update({ template: template })
      .then(() => {
        dispatch({ type: "UPDATE_MENU_TEMPLATE", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_MENU_ERROR", err });
      });
  };
};
