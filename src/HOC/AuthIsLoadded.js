import React from "react";
import { useSelector } from 'react-redux';
import { isLoaded } from "react-redux-firebase";
import Loading from "../components/Loading";

export default function ({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  if (isLoaded(auth) && isLoaded(profile)) {
    console.info("auth", auth);
    console.info("profile", profile);
    return children;
  }
  return <Loading />;
}
