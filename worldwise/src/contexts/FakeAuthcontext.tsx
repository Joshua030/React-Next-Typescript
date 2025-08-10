import { createContext, ReactNode, useContext, useReducer } from "react";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

type AuthContextType = InitialState & {
  login: (email: string, password: string) => void;
  logout: () => void;
};

interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
}

enum AuthActionKind {
  LOGIN = "auth/login",
  LOGOUT = "auth/logout",
}

// An interface for our actions
// 5. Discriminated union for actions
type AuthAction =
  | { type: AuthActionKind.LOGIN; payload: User }
  | { type: AuthActionKind.LOGOUT };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const AuthReducer = (state: InitialState, action: AuthAction): InitialState => {
  switch (action.type) {
    case AuthActionKind.LOGIN:
      return { ...state, user: action.payload, isAuthenticated: true };
    case AuthActionKind.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw Error("Unknown action");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    AuthReducer,
    initialState
  );

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: AuthActionKind.LOGIN, payload: FAKE_USER });
  };

  const logout = () => {
    dispatch({ type: AuthActionKind.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of the AuthProvider");
  return context;
}

export { useAuth, AuthProvider };
