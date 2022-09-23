import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import axios from "axios";
import './app.css'
// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";
import AuthProvider, { useAuth } from "../context/AuthContext";
import AddRestaurentForm from "../pages/login/AddRestaurentForm";
import UserMenu from "../pages/UserMenu/UserMenu";
import ShowReviews from "../pages/showReviews/ShowReviews";
import TabMenu from "../pages/TabMenu/TabMenu";
import Registration from "../pages/login/Registration";
import CustomerRegistration from "../pages/Review/CustomerRegistration";

export default function App() {
  // global
  var { isAuthenticated } = useAuth();
  axios.defaults.baseURL = `https://mughalsignandprint.co.uk/restaurant`;
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} /> */}
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/registration" component={Registration} />
        <Route path="/usermenu/:id" component={UserMenu} />
        <Route path="/review/:id" component={ShowReviews} />
        <Route path="/tabmenu/:id" component={TabMenu} />
        <PublicRoute path="/addrestaurent" component={AddRestaurentForm} />
        <Route path="/customer_registration" component={CustomerRegistration} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
