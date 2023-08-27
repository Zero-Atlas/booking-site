import { Link, useRouteLoaderData, useNavigate } from "react-router-dom";
import "./LogoUser.css";
const LogoUser = function () {
  const loginUser = useRouteLoaderData("root");
  const navigate = useNavigate();
  return (
    <div className="wp-logo-user">
      <a to="/" className="logo" onClick={navigate.bind(null,'/')}>
        Booking
      </a>
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
