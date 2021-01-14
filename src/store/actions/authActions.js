export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
      ).then(resp => {
        return firestore.collection('users').doc(resp.user.uid).set({
          lastName: newUser.lastName,
          firsName: newUser.firstName,
          restoName: newUser.restoName,
          email: newUser.email,
          city: newUser.city,
          postalCode: newUser.postalCode,
          cguAccepted: newUser.cguAccepted,
        });
      }).then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      }).catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};


export const signInWithGoogle = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(() => dispatch({ type: "LOGIN_SUCCESS" }))
      .catch(error => dispatch({ type: "LOGIN_ERROR", error }));
  };
};

export const signInWithFacebook = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(() => dispatch({ type: "LOGIN_SUCCESS" }))
      .catch(error => dispatch({ type: "LOGIN_ERROR", error }));
  };
};

export const sendPasswordReset = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .sendPasswordResetEmail(credentials.email)
      .then(() => {
        dispatch({ type: "SEND_PASSWORD_RESET_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SEND_PASSWORD_RESET_ERROR", err });
      });
  };
};

