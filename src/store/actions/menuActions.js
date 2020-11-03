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
      // const restaurantId = getState().firestore.restaurant
      // console.log('resto in actions', restaurant)
      console.log('payload', payload)
      let menuId = payload.menuId
      let title = payload.title
      console.log('menuId in actions',menuId)
      console.log('title in actions', title)
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
  