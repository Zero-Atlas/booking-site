import { Link, useRouteLoaderData } from "react-router-dom";
import "./LogoUser.css";
const LogoUser = function () {
  const loginAdmin = useRouteLoaderData("root");
  return (
    <div className="wp-logo-user">
      <Link to="/dashboard" className="logo">
        Booking Website
      </Link>
      <div className="user">
        {!loginAdmin.message && <p>{loginAdmin.email}</p>}
        {!loginAdmin.message ? (
          <>
            <Link className="btn" to="/dashboard">
              Dashboard
            </Link>
            <Link className="btn" to="/logout">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="btn" to="/">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default LogoUser;
