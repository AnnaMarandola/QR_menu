export const createDish = (data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
    //   const ownerId = getState().firebase.auth.uid;
  
      firestore
        .collection("dishes")
        .add({
          ...data,
          createAt: new Date(),
        })
        .then(() => {
          dispatch({ type: "CREATE_DISH", data });
        }).catch((err) => {
          dispatch({ type: 'CREATE_DISH_ERROR', err})
        });
    };
  };