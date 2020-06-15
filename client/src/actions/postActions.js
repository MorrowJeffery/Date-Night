import axios from "axios";
import { GET_POSTS, SAVE_POST, SAVE_PIC, GET_ERRORS, GET_POST, SET_CURRENT_POST, GET_MY_POSTS, UPDATE_USER_POSTS } from "./types";

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

export const getMyPosts = (id) => dispatch => {
    axios
    .get(`/api/myposts/${id}`)
    .then(res => {
        dispatch({
            type: GET_MY_POSTS,
            payload: res.data
        })
    })
}

export const setCurrentPost = (id) => dispatch => {
    dispatch({
        type:SET_CURRENT_POST,
        payload: id
    })
}

export const getPost = (id) => dispatch => {
    axios
    .get(`/api/posts/${id}`)
    .then(res => {
        dispatch({
            type:GET_POST,
            payload: res.data
        })
    })
}

export const deletePost = (postID) => dispatch => {
    axios
    .delete(`/api/posts/${postID}`)
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    })
}

export const updateUserPost = (userID, postID) => dispatch => {
    axios
    .put(`/api/update/${userID}/${postID}`)
    .then(data => {
        dispatch({
            type: UPDATE_USER_POSTS,
            payload: data.data
        })
    })
}

export const savePost = (postData) => dispatch => {
    axios
    .post("/api/posts", postData)
    .then(data => {
        dispatch({
            type: SAVE_POST,
            payload: (data.data._id)
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    })
}

export const savePic = (pic) => dispatch => {
    dispatch({
        type: SAVE_PIC,
        payload: pic
    })
}