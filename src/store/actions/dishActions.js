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

  export const deleteDish = (dishId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      console.log("dish Id in ACTIONS", dishId)
      const firestore = getFirestore();
  
      firestore
        .collection("dishes")
        .doc(dishId)
        .delete()
        .then(() => {
          dispatch({ type: "CREATE_DISH", dishId });
        }).catch((err) => {
          dispatch({ type: 'CREATE_DISH_ERROR', err})
        });
    };
  };