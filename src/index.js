/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/dashboard" render={(props) => <AdminLayout {...props} />} />
      <Route path="/icons" render={(props) => <AdminLayout {...props} />} />
      <Route path="/maps" render={(props) => <AdminLayout {...props} />} />
      <Route path="/voters" render={(props) => <AdminLayout {...props} />} />
      <Route path="/registrations" render={(props) => <AdminLayout {...props} />} />
      <Route path="/notifications" render={(props) => <AdminLayout {...props} />} />
      <Route path="/candidates" render={(props) => <AdminLayout {...props} />} />
      <Route path="/tables" render={(props) => <AdminLayout {...props} />} />
      <Route path="/profile" render={(props) => <AdminLayout {...props} />} />
    </Switch>
  </BrowserRouter>
);
