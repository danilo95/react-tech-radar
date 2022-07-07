import * as React from "react";
import { types } from "./Types";

const RadarContext = React.createContext();

function RadarReducer(state, action) {
  switch (action.type) {
    case types.SET_SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: action.payload,
      };
    }
    case types.IS_POPOVER_OPEN: {
      return {
        ...state,
        isPopOverOpen: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function RadarProvider({ children }) {
  const [state, dispatch] = React.useReducer(RadarReducer, {
    selectedItem: null,
    isPopOverOpen: false,
  });

  const value = { state, dispatch };
  return (
    <RadarContext.Provider value={value}>{children}</RadarContext.Provider>
  );
}

function useRadar() {
  const context = React.useContext(RadarContext);
  if (context === undefined) {
    throw new Error("useRadar must be used within a RadarProvider");
  }
  return context;
}

export { RadarProvider, useRadar };
