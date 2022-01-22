import * as React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Navigation.css';

const NavList = () => {

  return (
    <nav>
      <ul className='navLinkList'>
        <li className='navLink'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : undefined
            }
          >
            Deals
          </NavLink>
        </li>
        <li className='navLink'>
          <NavLink
            to="/games"
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : undefined
            }
          >
            Games
          </NavLink>
        </li>
        <li className='navLink'>
          <NavLink
            to="/stores"
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : undefined
            }
          >
            Stores
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavList;