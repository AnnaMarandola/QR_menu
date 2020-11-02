export const createDish = (dish) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
    //   const ownerId = getState().firebase.auth.uid;
  
      firestore
        .collection("dishes")
        .add({
          ...dish,
          createAt: new Date(),
        })
        .then(() => {
          dispatch({ type: "CREATE_DISH", dish });
        }).catch((err) => {
          dispatch({ type: 'CREATE_DISH_ERROR', err})
        });
    };
  };