import { useContext, useReducer } from "react";
import { createContext } from "react";

type State = {
  isMenuOpen: boolean;
};

type Action = {
  type: "OPEN_MENU" | "CLOSE_MENU";
};

type NavigationContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

const initialState: State = {
  isMenuOpen: false,
};

function navigationReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, isMenuOpen: true };
    case "CLOSE_MENU":
      return { ...state, isMenuOpen: false };
    default:
      return state;
  }
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
