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