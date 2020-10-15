export const createRestaurant = (restaurant) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const ownerId = getState().firebase.auth.uid;

    firestore
      .collection("restaurants")
      .add({
        ...restaurant,
        ownerId: ownerId,
        createAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_RESTAURANT", restaurant });
      }).catch((err) => {
        dispatch({ type: 'CREATE_RESTAURANT_ERROR', err})
      });
  };
};




export const updateRestaurant = (payload) =>  {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // const restaurantId = getState().firestore.restaurant
    // console.log('resto in actions', restaurant)
    console.log('payload', payload)
    let restoId = payload.restoId
    let template = payload.template
    console.log('restoId in actions',restoId)
    console.log('template in actions', template)
    getFirestore()
    .collection('restaurants')
    .doc(restoId)
    .update({ template: template })
    .then(() => {
      dispatch({ type: "UPDATE_RESTAURANT", payload });
    }).catch((err) => {
      dispatch({ type: 'UPDATE_RESTAURANT_ERROR', err})
    });
  }
}
