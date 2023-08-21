import "./NavBar.css";
import React from "react";
import LogoUser from "./LogoUser";
const NavBar = function () {
  return (
    <nav>
      <div className="container">
        <LogoUser />
      </div>
    </nav>
  );
};

export default NavBar;
