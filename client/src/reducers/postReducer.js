import { GET_POSTS, SAVE_POST, SAVE_PIC, GET_ERRORS, GET_POST, SET_CURRENT_POST, GET_MY_POSTS, UPDATE_USER_POSTS } from "../actions/types";

const initialState = {
    posts: [],
    successfulPost: "false",
    heldPic: "",
    errors: {},
    currentPost: "",
    postDetail: [],
    myPosts: [],
    userUpdate: "false"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case SAVE_POST:
      return {
          ...state,
          successfulPost: action.payload
      }
    case UPDATE_USER_POSTS:
      return {
        ...state,
        userUpdate: "true"
      }
    case GET_POST:
      return {
        ...state,
        postDetail: action.payload
      }
    case SAVE_PIC:
      return {
          ...state,
          heldPic: action.payload
      }
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload
      }
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload
      }
    case GET_ERRORS:
        return {
            ...state,
            errors: action.payload
        }
    default:
      return state;
  }
}
