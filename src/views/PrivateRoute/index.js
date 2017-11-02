import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    true ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: "/",
        state: { from: props.location }
      }}/>
    )
  )}/>
)
//dovrai sostituire true con la condizione che checkka se sei loggato

export default PrivateRoute;
