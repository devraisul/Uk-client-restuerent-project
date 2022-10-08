import axios from "axios";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './app.css';
// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useAuth } from "../context/AuthContext";
import AddRestaurentForm from "../pages/login/AddRestaurentForm";
import ForgotPassword from "../pages/login/ForgotPassword";
import Registration from "../pages/login/Registration";
import CustomerRegistration from "../pages/Review/CustomerRegistration";
import PlaceOrderForm from "../pages/Review/PlaceOrderForm";
import ShowReviews from "../pages/showReviews/ShowReviews";
import TabMenu from "../pages/TabMenu/TabMenu";
import UserMenu from "../pages/UserMenu/UserMenu";
import UserOrder from "../pages/userOrder/UserOrder";
import CustomerLogin from "./CustomerLogin/CustomerLogin";

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
        <Route path="/customerlogin" component={CustomerLogin} />
        <PublicRoute path="/registration" component={Registration} />
        {/* forgot password */}
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <Route path="/usermenu/:id" component={UserMenu} />
        <Route path="/customer_registration" component={CustomerRegistration} />
        <Route path="/place_order/:restaurantId" component={PlaceOrderForm} />
        <Route path="/review/:id" component={ShowReviews} />
        <Route path="/tabmenu/:id" component={TabMenu} />
        <Route path="/order" component={UserOrder} />
        <PublicRoute path="/addrestaurent" component={AddRestaurentForm} />

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
