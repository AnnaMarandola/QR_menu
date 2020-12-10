export const createMenu = (menu) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      const ownerId = getState().firebase.auth.uid;
  
      firestore
        .collection("menus")
        .add({
          ...menu,
          ownerId: ownerId,
          ownerRef: firestore.collection('users').doc(ownerId),
          createAt: new Date(),
        })
        .then(() => {
          dispatch({ type: "CREATE_MENU", menu });
        }).catch((err) => {
          dispatch({ type: 'CREATE_MENU_ERROR', err})
        });
    };
  };

  export const updateMenu = (payload) =>  {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      let menuId = payload.menuId
      let title = payload.title 
      getFirestore()
      .collection('menus')
      .doc(menuId)
      .update({ title: title })
      .then(() => {
        dispatch({ type: "UPDATE_MENU", payload });
      }).catch((err) => {
        dispatch({ type: 'UPDATE_MENU_ERROR', err})
      });
    }
  }

  
  export const selectColor =(payload) => {
    console.log("payload in select color ACTION", payload)
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      let menuId = payload.menuId
      let color = payload.color
      getFirestore()
      .collection('menus')
      .doc(menuId)
      .update({ headerColor: color})
      .then(() => {
        dispatch({ type: "SELECT_COLOR", payload});
      }).catch((err) => {
        dispatch({ type: "SELECT_COLOR_ERROR", err})
      })
    }
  }