export const createRestaurant = (restaurant, auth) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("restaurants")
      .add({
        ...restaurant,
        authorId: '',
        createAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_RESTAURANT", restaurant });
      }).catch((err) => {
        dispatch({ type: 'CREATE_RESTAURANT_ERROR', err})
      });
  };
};
