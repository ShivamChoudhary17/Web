import React, { createContext, useContext, useReducer } from "react";

// Prepare DataLayer
export const DataLayerContext = createContext();

//Actual DataLayer
export const DataLayer = ({ reducer, initialState, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);
// Way to connnect to DataLayer
export const useDataLayerValue = () => useContext(DataLayerContext);