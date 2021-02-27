export const createRestaurant = (restaurant) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const ownerId = getState().firebase.auth.uid;

    firestore
      .collection("restaurants")
      .add({
        ...restaurant,
        ownerId: ownerId,
        ownerRef: firestore.collection("users").doc(ownerId),
        createAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_RESTAURANT", restaurant });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_RESTAURANT_ERROR", err });
      });
  };
};

export const updateRestaurantMenu = (payload) => {
  console.log("payload MMMMMMMM IN ACTIONS", payload)
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("payload", payload);
    let restoId = payload.restoId;
    let menuId = payload.menuId;
    console.log("restoId in actions", restoId);
    console.log("MENU in actions", menuId);
    getFirestore()
      .collection("restaurants")
      .doc(restoId)
      .update({ menuId: menuId })
      .then(() => {
        dispatch({ type: "UPDATE_RESTAURANT_MENU", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_RESTAURANT_MENU_ERROR", err });
      });
  };
};

export const updateRestaurant = (payload) => {
  console.log("payload TEMPLATE IN ACTIONS", payload)
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("payload", payload);
    let restoId = payload.restoId;
    let template = payload.template;
    console.log("restoId in actions", restoId);
    console.log("template in actions", template);
    getFirestore()
      .collection("restaurants")
      .doc(restoId)
      .update({ template: template })
      .then(() => {
        dispatch({ type: "UPDATE_RESTAURANT", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_RESTAURANT_ERROR", err });
      });
  };
};

export const editRestaurant = (restaurant, restoId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const ownerId = getState().firebase.auth.uid;
    getFirestore()
      .collection("restaurants")
      .doc(restoId)
      .update({
        ...restaurant,
        template: restaurant.template || null,
        ownerId: ownerId,
      })
      .then(() => {
        dispatch({ type: "EDIT_RESTAURANT", restaurant });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_RESTAURANT_ERROR", err });
      });
  };
};

export const updateOptions = (payload) => {
  console.log("options payload", payload.options)
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore()
      .collection("restaurants")
      .doc(payload.restoId)
      .update({
         options: {...payload.options},
      })
      .then(() => {
        dispatch({ type: "UPDATE_OPTIONS", payload });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_OPTIONS_ERROR", err });
      });
  };
};

// https://firebase.google.com/docs/storage/web/start
export const uploadLogoPicture = (file, restoId) => 
(dispatch,getState,{ getFirebase }) => {
  console.log("file and resto in upload action", file, restoId)
  const firebase = getFirebase();
  firebase
    .storage()
    .ref(
      `logo-pictures/${restoId}-${new Date().getMilliseconds()}.${file.name.split(".").pop()}`
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

export const uploadCarouselPicture = (file, restoId) => 
(dispatch,getState,{ getFirebase }) => {
  console.log("file and resto in upload action", file, restoId)
  const firebase = getFirebase();
  firebase
    .storage()
    .ref(
      `carousel-pictures/${restoId}-${new Date().getMilliseconds()}.${file.name.split(".").pop()}`
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

export const removeCarouselPicture = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let restoId = payload.restoId;
    let image = payload.image;
    console.log("payload inREMOVE", payload)
    getFirestore()
      .collection("restaurants")
      .doc(restoId)
      .update({ carousel: getFirestore().FieldValue.arrayRemove(image)})
      .then(() => {
        dispatch({ type: "REMOVE_PICTURE", payload });
      })
      .catch((err) => {
        dispatch({ type: "REMOVE_PICTURE_ERROR", err });
      });
  };
};
