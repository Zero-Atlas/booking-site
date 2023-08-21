import { Link } from "react-router-dom";
import "./NavItem.css";
const NavItem = function (props) {
  return (
    <li className="nav-item">
      <Link
        to="/"
        className={`nav-link ${props.active ? "active" : ""}`}
        value={props.value}
      >
        <i className={`fa ${props.icon}`}></i>
        {props.value}
      </Link>
    </li>
  );
};
export default NavItem;
