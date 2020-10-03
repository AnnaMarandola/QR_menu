export const createRestaurant = (restaurant) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "CREATE_RESTAURANT", restaurant });
  };
};
