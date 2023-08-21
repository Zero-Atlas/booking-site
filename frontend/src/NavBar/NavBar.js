import "./NavBar.css";
import React from "react";
import NavItem from "./NavItem";
import LogoUser from "./LogoUser";
const NavBar = function () {
  const [navList] = React.useState([
    {
      type: "Stays",
      icon: "fa-bed",
      active: true,
    },
    {
      type: "Flights",
      icon: "fa-plane",
      active: false,
    },
    {
      type: "Car rentals",
      icon: "fa-car",
      active: false,
    },
    {
      type: "Attractions",
      icon: "fa-bed",
      active: false,
    },
    {
      type: "Airport taxis",
      icon: "fa-taxi",
      active: false,
    },
  ]);
  return (
    <nav>
      <div className="container">
        <LogoUser />
        <ul className="main-nav">
          {navList.map((item) => (
            <NavItem
              value={item.type}
              active={item.active}
              icon={item.icon}
              key={item.type}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
