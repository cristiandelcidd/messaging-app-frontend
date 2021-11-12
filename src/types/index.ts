import { UserInformation } from "../firebase";

export interface DocumentModel {
  _id?: string;
  message: string;
  name: string;
  timestamp: string;
  received: boolean;
}

export interface Action {
  type: ActionTypes.SET_USER;
  user: UserInformation;
}

export interface User {
  user: UserInformation | null;
}

export enum ActionTypes {
  SET_USER = "SET_USER",
}

export type SetUserAction = {
  type: typeof ActionTypes.SET_USER;
  user: UserInformation;
};

export type UserActionTypes = SetUserAction;

export const setUser = (user: UserInformation): UserActionTypes => ({
  type: ActionTypes.SET_USER,
  user,
});
