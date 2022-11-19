import React, { createContext, useEffect, useReducer, useCallback } from "react";
import {useRouter} from 'next/router';

interface Context {
  token: string | null;
  isLoading: boolean;
  loginHandler: (token: string) => void;
  logoutHandler: () => void;
}

export const AuthContext = createContext<Context | null>(null);

type Actions =
  | { type: "LOGIN"; token: string }
  | { type: "LOGOUT" }
  | { type: "ERROR" }
  | {type: 'INIT', token: string};

type State = Pick<Context, "token" | "isLoading">;

const initialState: State = {
  token: null,
  isLoading: true,
};

const reducer = (state: State, actions: Actions): State => {
  switch (actions.type) {
    case "LOGIN":
      return {
        ...state,
        token: actions.token,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
      };
    case 'INIT':
      return {
        isLoading: false,
        token: actions.token
      }
    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {push} = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch({ type: "INIT", token });
    } else {
      dispatch({ type: "ERROR" });
    }
  }, [dispatch]);

  const loginHandler = useCallback((token: string, redirectTo: string = '/dashboard') => {
    dispatch({ type: "LOGIN", token });
    sessionStorage.setItem("token", token);
    push(redirectTo);
  }, [dispatch, push]);

  const logoutHandler = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem("token");
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ ...state, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
}; 


export default AuthProvider;