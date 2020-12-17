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
      })
      .catch((err) => {
        dispatch({ type: "CREATE_DISH_ERROR", err });
      });
  };
};

export const updateDish = (dish, dishId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore()
      .collection("dishes")
      .doc(dishId)
      .update({
        ...dish,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "UPDATE_DISH", dish });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_DISH_ERROR", err });
      });
  };
};

export const switchStatus = (payload) => {
  console.log("payload in select switchStatus ACTION", payload);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let dishId = payload.dishId;
    let status = payload.status;
    getFirestore()
      .collection("dishes")
      .doc(dishId)
      .update({ published: status })
      .then(() => {
        dispatch({ type: "SWITCH_STATUS", payload });
      })
      .catch((err) => {
        dispatch({ type: "SWITCH_STATUS_ERROR", err });
      });
  };

}

export const deleteDish = (dishId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("dish Id in ACTIONS", dishId);
    const firestore = getFirestore();

    firestore
      .collection("dishes")
      .doc(dishId)
      .delete()
      .then(() => {
        dispatch({ type: "CREATE_DISH", dishId });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_DISH_ERROR", err });
      });
  };
};
