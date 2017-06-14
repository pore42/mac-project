import React from "react";
import ReactDOM from "react-dom";
import {LocaleProvider} from "antd";
import GoogleLogin from 'react-google-login';
import enUS from "antd/lib/locale-provider/en_US";
import "antd/dist/antd.css";
import moment from "moment";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

 import MacRentInformations from './views/mac-rent-informations';
 import MacRentTable from './views/mac-rent-table';
import UserLogin from './views/user-login';

ReactDOM.render(
    <LocaleProvider locale={enUS}><MacRentInformations /></LocaleProvider>,
//   <MacRentTable />,
  // <UserLogin />,
  document.getElementById("root")
);
