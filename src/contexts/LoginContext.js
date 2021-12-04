import { createContext } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// import { useState } from "react";

export const LoginContext = createContext();

function LoginContextProvider(props) {
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useLocalStorage(
    "ownerLoggedIn",
    false
  );
  const [currentOwner, setCurrentOwner] = useLocalStorage(
    "current-owner",
    "no-owner-logged-in"
  );

  const handleOwnerLogout = () => {
    setIsOwnerLoggedIn(false);
    setCurrentOwner({
      name: null,
      username: null,
    });
    console.log(isOwnerLoggedIn);
  };

  const handleOwnerLogin = (ownerData) => {
    setIsOwnerLoggedIn(true);
    setCurrentOwner({
      name: ownerData.name,
      username: ownerData.username,
    });
    console.log(ownerData);
  };

  const value = {
    isOwnerLoggedIn,
    setIsOwnerLoggedIn,
    currentOwner,
    setCurrentOwner,
    handleOwnerLogout,
    handleOwnerLogin,
  };

  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
