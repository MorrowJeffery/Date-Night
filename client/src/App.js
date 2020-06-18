import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import AppNav from "./components/Navbar/Navbar";
import Landing from "./components/landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import PostsPage from "./components/postPages/allPostsPage";
import savePostPage from "./components/postPages/newPostPage";
import PostDetail from "./components/postPages/postDetail";
import MyPosts from "./components/postPages/myPosts";
import settings from "./components/settings/settings";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNav />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/posts" component={PostsPage} />
              <PrivateRoute exact path="/submitpost" component={savePostPage} />
              <PrivateRoute exact path="/myposts" component={MyPosts} />
              <PrivateRoute path="/post/" component={PostDetail} />
              <PrivateRoute exact oath="/settings" component={settings} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
