export const createDish = (data) => {
  return (dispatch, getState,  { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

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
};

export const deleteDish = (dishId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
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

export const uploadDishPic = (file, dishId) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  firebase
    .storage()
    .ref(
      `dish-pictures/${dishId}-${new Date().getMilliseconds()}.${file.name
        .split(".")
        .pop()}`
    )
    .put(file)
    .on(
      "state_changed",
      function progress(snapshot) {
        dispatch({
          type: "UPLOAD_PROGRESS",
          progress: (100 * snapshot.bytesTransferred) / snapshot.totalBytes,
        });
      },
      function error(err) {
        dispatch({ type: "UPLOAD_ERROR", err });
      },
      function complete() {
        dispatch({ type: "UPLOAD_COMPLETE" });
      }
    );
};
