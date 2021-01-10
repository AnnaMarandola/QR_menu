
export const sendMessage = (message) => {
    console.log("payload in messageAction", message)
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        getFirestore()
        .collection("messages")
        .add({
            ...message,
        })
        .then(() => {
            dispatch({ type: "CREATE_MESSAGE", message });
          })
          .catch((err) => {
            dispatch({ type: "CREATE_MESSAGE_ERROR", err });
          });
    
    }
}