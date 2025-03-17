import { useContext, useReducer } from "react";
import { createContext } from "react";

type State = {
  isMenuOpen: boolean;
  selectedMenuItem: string | null;
  backgroundImage: string | null;
  selectedSubmenuItem: string | null;
  selectedLevelThreeItem: string | null;
};

type Action =
  | {
      type: "OPEN_MENU" | "CLOSE_MENU";
    }
  | {
      type: "SELECT_MENU_ITEM";
      payload: {
        id: string | null;
        image: string | null;
      };
    }
  | {
      type: "SELECT_SUBMENU_ITEM";
      payload: string | null;
    }
  | {
      type: "SELECT_LEVEL_THREE_ITEM";
      payload: string | null;
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
  selectedMenuItem: null,
  backgroundImage: null,
  selectedSubmenuItem: null,
  selectedLevelThreeItem: null,
};

function navigationReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, isMenuOpen: true };
    case "CLOSE_MENU":
      return initialState;
    case "SELECT_MENU_ITEM":
      return {
        ...state,
        selectedMenuItem: action.payload.id,
        backgroundImage: action.payload.image,
      };
    case "SELECT_SUBMENU_ITEM":
      return { ...state, selectedSubmenuItem: action.payload };
    case "SELECT_LEVEL_THREE_ITEM":
      return { ...state, selectedLevelThreeItem: action.payload };
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
