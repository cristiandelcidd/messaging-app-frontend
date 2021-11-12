import { ActionTypes, User, UserActionTypes } from "../../types/index";

const reducer = (state: User, action: UserActionTypes) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
