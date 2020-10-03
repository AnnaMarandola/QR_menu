export const createRestaurant = (restaurant) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("restaurants")
      .add({
        ...restaurant,
        authorId: 123123,
        createAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_RESTAURANT", restaurant });
      }).catch((err) => {
        dispatch({ type: 'CREATE_RESTAURANT_ERROR', err})
      });
  };
};
