
export const sendRestoMessage = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        getFirestore()
        .collection("restoMessages")
        .add({
            ...message,
        })
        .then(() => {
            dispatch({ type: "CREATE_RESTO_MESSAGE", message });
          })
          .catch((err) => {
            dispatch({ type: "CREATE_RESTO_MESSAGE_ERROR", err });
          });
    
    }
}