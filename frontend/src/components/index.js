import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to="/" activestyle>
            Revenue Growth
          </NavLink>
          <NavLink to="/revenuegrowthpersource" activestyle>
            Revenue Growth per Source
          </NavLink>
          <NavLink to="/channelscontribution" activestyle>
            Channel Contribution
          </NavLink>
          <NavLink to="/productcontribution" activestyle>
            Product Contribution
          </NavLink>
          <NavLink to="/productranked" activestyle>
            Product Ranked
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
