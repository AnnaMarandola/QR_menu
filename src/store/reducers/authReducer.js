const initialState = {
  authError: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;
    case "SIGNOUT_ERROR":
      console.log("signout error");
      return state;

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message,
      };

    case "SEND_PASSWORD_RESET_SUCCESS":
      console.log("send password reset success");
      return {
        ...state,
        authError: null,
      };
    case "SEND_PASSWORD_RESET_ERROR":
      console.log("send password reset error");
      return {
        ...state,
        authError: action.err.message,
      };

    default:
      return state;
  }
};

export default authReducer;
