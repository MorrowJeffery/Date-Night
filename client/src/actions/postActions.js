import axios from "axios";
import { GET_POSTS } from "./types";

// Get all posts
export const getPosts = () => dispatch => {
  axios
    .get("/api/posts")
    .then(res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
          })
    })
};