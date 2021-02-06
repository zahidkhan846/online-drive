import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Error from "./components/Error/Error";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import UpdateProfile from "./components/Auth/UpdateProfile";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Fragment>
      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route path="/signin" component={Signin} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/signup" component={Signup} />
        <Route component={Error} />
      </Switch>
    </Fragment>
  );
}

export default App;
