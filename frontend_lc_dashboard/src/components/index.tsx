import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/">HOMEPAGE - OVERVIEW</NavLink>
          <NavLink to="/transaction">Transaction</NavLink>
          <NavLink to="/b2b">B2B</NavLink>
          <NavLink to="/b2bcorporate">B2B - Corporate</NavLink>
          <NavLink to="/b2bretail">B2B - Retail</NavLink>
          <NavLink to="/ownshop">Own Shop</NavLink>
          <NavLink to="/ownshopcommerce">Own Shop - Commerce</NavLink>
          <NavLink to="/ownshopcorner">Own Shop - Corner</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
