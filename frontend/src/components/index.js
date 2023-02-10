import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to="/" activestyle>
           HOMEPAGE - OVERVIEW
          </NavLink>
          <NavLink to="/transaction" activestyle>
            Transaction
          </NavLink>
          <NavLink to="/b2b" activestyle>
            B2B
          </NavLink>
          <NavLink to="/b2bcorporate" activestyle>
            B2B - Corporate
          </NavLink>
          <NavLink to="/productranked" activestyle>
            Product Ranked
          </NavLink>
          <NavLink to="/tabletransaction" activestyle>
            Transaction Table
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
