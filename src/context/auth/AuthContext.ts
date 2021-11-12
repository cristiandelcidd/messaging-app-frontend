import { createContext } from "react";
import { User, UserActionTypes } from "../../types/index";

export const initialState: User = { user: null };

export const AuthContext = createContext<
  [User, React.Dispatch<UserActionTypes>]
>([initialState, () => {}]);
