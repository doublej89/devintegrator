import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import AddExperience from "./components/AddExperience";
import AddEducation from "./components/AddEducation";
import Profiles from "./components/Profiles";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Posts from "./components/Posts";
import Post from "./components/Post";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";
import jwtdecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import rootReducer from "./reducers";
import { CLEAR_CURRENT_PROFILE } from "./actions/types";

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtdecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    store.dispatch(setCurrentUser({}));
    store.dispatch({ type: CLEAR_CURRENT_PROFILE });
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
