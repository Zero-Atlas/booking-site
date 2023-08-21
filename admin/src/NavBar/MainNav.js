import { NavLink } from "react-router-dom";

import classes from "./MainNav.module.css";
export default function MainNav() {
  return (
    <ul className={classes.list}>
      <li className={classes["list-item"]}>
        <h4>MAIN</h4>
        <ul className={classes.links}>
          <NavLink to="/dashboard">
            <i className="fa-solid fa-table"></i>Dashboard
          </NavLink>
        </ul>
      </li>
      <li className={classes["list-item"]}>
        <h4>LISTS</h4>
        <ul className={classes.links}>
          <NavLink to="/dashboard">
            <i className="fa-regular fa-user"></i>User
          </NavLink>
          <NavLink to="/dashboard/hotel">
            <i className="fa-solid fa-hotel"></i>Hotel
          </NavLink>
          <NavLink to="/dashboard/rooms">
            <i className="fa-solid fa-table-columns"></i>Rooms
          </NavLink>
          <NavLink to="/dashboard/transaction">
            <i className="fa-solid fa-truck"></i>Transaction
          </NavLink>
        </ul>
      </li>
      <li className={classes["list-item"]}>
        <h4>NEW</h4>
        <ul className={classes.links}>
          <NavLink to="/dashboard/hotel/new">
            <i className="fa-solid fa-hotel"></i>New Hotel
          </NavLink>
          <NavLink to="/dashboard/room/new">
            <i className="fa-solid fa-table-columns"></i>New Rooms
          </NavLink>
        </ul>
      </li>
      <li className={classes["list-item"]}>
        <h4>User</h4>
        <ul className={classes.links}>
          <NavLink to="/logout">
          <i className="fa-solid fa-right-from-bracket"></i>Logout
          </NavLink>
        </ul>
      </li>
    </ul>
  );
}
