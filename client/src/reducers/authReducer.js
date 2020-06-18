import { SET_CURRENT_USER, USER_LOADING, UPDATE_USER_PW } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  updateErrors: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_USER_PW:
      return {
        ...state,
        updateErrors: action.payload
      }
    default:
      return state;
  }
}
