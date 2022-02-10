const initialState = {
    restoMessages: [],
  };
  
  const restoMessageReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_RESTO_MESSAGE":
        return state;
      case "CREATE_RESTO_MESSAGE_ERROR":
        console.log("create resto message error", action.err);
        return state;
      default:
        return state;
    }
  };
  
  export default restoMessageReducer;