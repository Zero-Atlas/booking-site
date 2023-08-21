import { Link, useRouteLoaderData } from "react-router-dom";
import "./LogoUser.css";
const LogoUser = function () {
  const loginUser = useRouteLoaderData("root");
  return (
    <div className="wp-logo-user">
      <Link to="/" className="logo">
        Booking
      </Link>
      <div className="user">
        {loginUser && <p>{loginUser.email}</p>}
        {loginUser ? (
          <>
            <Link className="btn" to="/transaction">
              Transaction
            </Link>
            <Link className="btn" to="/logout">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="btn" to="/login?action=signup">
              Register
            </Link>
            <Link className="btn" to="/login?action=login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default LogoUser;
