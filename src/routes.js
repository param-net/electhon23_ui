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
import Login from "views/Login";
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Profile from "views/Profile.js";
import VotersList from "views/voters-list";

// var routes = [
//   {
//     path: "/login",
//     name: "Login",
//     icon: "nc-icon nc-login",
//     component: Login,
//     layout: "/login"
//   },
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: "nc-icon nc-bank",
//     component: Dashboard,
//     layout: "/dashboard"
//   },
//   {
//     path: "/icons",
//     name: "Icons",
//     icon: "nc-icon nc-diamond",
//     component: Icons,
//     layout: "/icons"
//   },
//   {
//     path: "/maps",
//     name: "Maps",
//     icon: "nc-icon nc-pin-3",
//     component: Maps,
//     layout: "/maps"
//   },
//   {
//     path: "/notifications",
//     name: "Notifications",
//     icon: "nc-icon nc-bell-55",
//     component: Notifications,
//     layout: "/notifications"
//   },
//   {
//     path: "/candidates",
//     name: "Vote",
//     icon: "nc-icon nc-tile-56",
//     component: UserPage,
//     layout: "/candidates"
//   },
//   {
//     path: "/voters",
//     name: "Voters List",
//     icon: "nc-icon nc-tile-56",
//     component: VotersList,
//     layout: "/admin"
//   },
//   {
//     path: "/tables",
//     name: "Table List",
//     icon: "nc-icon nc-tile-56",
//     component: TableList,
//     layout: "/tables"
//   },
//   {
//     path: "/profile",
//     name: "Profile",
//     icon: "nc-icon nc-single-02",
//     component: Profile,
//     layout: "/profile"
//   }
// ];

var routes = [
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-login",
  //   component: Login,
  //   layout: "/login"
  // },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: Profile,
    layout: "/profile"
  },
  {
    path: "/candidates",
    name: "Vote",
    icon: "nc-icon nc-tile-56",
    component: UserPage,
    layout: "/candidates"
  },
  {
    path: "/voters",
    name: "Voters List",
    icon: "nc-icon nc-tile-56",
    component: VotersList,
    layout: "/admin"
  }
]
export default routes;
