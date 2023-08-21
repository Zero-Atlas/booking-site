import { Outlet, useRouteLoaderData } from "react-router-dom";
import MainNav from "../NavBar/MainNav";
import classes from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  const loginAdmin = useRouteLoaderData("root");
  let logged = true;
  if (loginAdmin.message) {
    logged = false;
  }
  return (
    <div className={classes.grid}>
      <div className={classes.title}>
        <h1>Admin Page</h1>
      </div>
      <div className={classes.nav}>
        <MainNav />
      </div>
      <div className={classes.content}>
        {logged && <Outlet />}
        {!logged && <h1>Please Login</h1>}
      </div>
    </div>
  );
}
