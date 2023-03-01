import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activestyle="">
            HOMEPAGE - OVERVIEW
          </NavLink>
          <NavLink to="/transaction" activestyle="">
            Transaction
          </NavLink>
          <NavLink to="/b2b" activestyle="">
            B2B
          </NavLink>
          <NavLink to="/b2bcorporate" activestyle="">
            B2B - Corporate
          </NavLink>
          <NavLink to="/b2bretail" activestyle="">
            B2B - Retail
          </NavLink>
          <NavLink to="/ownshop" activestyle="">
            Own Shop
          </NavLink>
          <NavLink to="/ownshopcommerce" activestyle="">
            Own Shop - Commerce
          </NavLink>
          <NavLink to="/ownshopcorner" activestyle="">
            Own Shop - Corner
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
