import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    (localStorage.getItem("userName") !== null && localStorage.getItem("userName") !== "loggedOutUser" ) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: "/",
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute;
