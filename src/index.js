import React from "react";
import ReactDOM from "react-dom";
import enUS from "antd/lib/locale-provider/en_US";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import MacRentInformations from './views/mac-rent-informations';
import MacRentTable from './views/mac-rent-table';
import UserLogin from './views/user-login';
import PrivateRoute from "./views/PrivateRoute";

var LocaleProvider = require('antd/lib/locale-provider');

ReactDOM.render((

 <Router>
   <LocaleProvider locale={enUS}>
    <Switch>
        <PrivateRoute path="/input/:id" component={MacRentInformations} />      
        <PrivateRoute path="/input" component={MacRentInformations} />
        <PrivateRoute path="/results" component={MacRentTable} />
        <Route component={UserLogin} />
      </Switch>
    </LocaleProvider>
</Router>
  ),  document.getElementById("root"));
