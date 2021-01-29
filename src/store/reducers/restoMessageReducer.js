const initialState = {
    restoMessages: [],
  };
  
  const restoMessageReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_RESTO_MESSAGE":
        console.log("created  resto message", action.message);
        return state;
      case "CREATE_RESTO_MESSAGE_ERROR":
        console.log("create resto message error", action.err);
        return state;
      default:
        return state;
    }
  };
  
  export default restoMessageReducer;