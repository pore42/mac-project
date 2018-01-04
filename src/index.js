import React from "react";
import ReactDOM from "react-dom";
import enUS from "antd/lib/locale-provider/en_US";
import "antd/dist/antd.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

import MacRentInformations from "./views/mac-rent-informations";
import MacRentTable from "./views/mac-rent-table";
import UserLogin from "./views/user-login";
import PrivateRoute from "./views/PrivateRoute";


import store from "./reducers";

import LocaleProvider from "antd/lib/locale-provider";


//incapsulo tutto nel provider, che sarebbe lo store dell'applicazione
ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <LocaleProvider locale={enUS}>
        <Switch>
          <PrivateRoute path="/input/:id" component={MacRentInformations} />
          <PrivateRoute path="/input/" component={MacRentInformations} />
          <PrivateRoute path="/results/" component={MacRentTable} />
          <Route path="/" component={UserLogin} />
        </Switch>
      </LocaleProvider>
    </HashRouter>
  </Provider>
), document.getElementById("root"));
