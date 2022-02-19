import { createContext } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const LoginContext = createContext();

function LoginContextProvider(props) {
   const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useLocalStorage(
      "isOwnerLoggedIn",
      false
   );

   const [currentOwner, setCurrentOwner] = useLocalStorage(
      "currentLoggedInOwner",
      {
         id: null,
         name: null,
         username: null,
         hash: null,
         token: null,
      }
   );
   const handleOwnerLogout = () => {
      setIsOwnerLoggedIn(false);
      setCurrentOwner({
         id: null,
         name: null,
         username: null,
         hash: null,
         token: null,
      });
      console.log(isOwnerLoggedIn);
   };

   const value = {
      isOwnerLoggedIn,
      setIsOwnerLoggedIn,
      currentOwner,
      setCurrentOwner,
      handleOwnerLogout,
   };

   return (
      <LoginContext.Provider value={value}>
         {props.children}
      </LoginContext.Provider>
   );
}

export default LoginContextProvider;
