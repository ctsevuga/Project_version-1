import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
// const initialState = 
// {
//   _id: null,
//   name: null,
//   isAdmin: false,

// };

const initialState = {
user:{
  //   _id: null,
  // name: null,
  // isAdmin: false,
}
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  function setUser( user) {
    dispatch({
      type: "SET_USER",
      payload:user
    });
  }
  function removeUser(_id) {
    dispatch({
      type: "REMOVE_USER",
      payload: _id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
       user: state.user,
        setUser,
        removeUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
