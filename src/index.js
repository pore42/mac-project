import React from "react";
import ReactDOM from "react-dom";
import {LocaleProvider} from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import "antd/dist/antd.css";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import MacRentInformations from './views/mac-rent-informations';

ReactDOM.render(
  <LocaleProvider locale={enUS}><MacRentInformations /></LocaleProvider>,
  document.getElementById("root")
);
