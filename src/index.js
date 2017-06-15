import React, {Component} from "react";
import ReactDOM from "react-dom";
import {LocaleProvider} from "antd";
import GoogleLogin from 'react-google-login';
import enUS from "antd/lib/locale-provider/en_US";
import "antd/dist/antd.css";
import moment from "moment";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import MacRentInformations from './views/mac-rent-informations';
import MacRentTable from './views/mac-rent-table';
import UserLogin from './views/user-login';


ReactDOM.render((
// <LocaleProvider locale={enUS}><MacRentInformations /></LocaleProvider>,
// <MacRentTable />
//  <UserLogin />,
// <BasicExample/>,
 <Router>
   <LocaleProvider locale={enUS}>
    <Switch>
        <Route path="/input" component={MacRentInformations} />
        <Route path="/results" component={MacRentTable} />
        <Route component={UserLogin} />
      </Switch>
    </LocaleProvider>
</Router>
),  document.getElementById("root"));
