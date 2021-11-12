import { useReducer, useContext, FC, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User, UserActionTypes } from "../../types/index";

export const AuthState: FC<{
  reducer: (state: User, action: UserActionTypes) => User;
  initialState: User;
  children: ReactNode;
}> = ({ reducer, initialState, children }) => (
  <AuthContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthContext.Provider>
);

export const useStateValue = () => useContext(AuthContext);
