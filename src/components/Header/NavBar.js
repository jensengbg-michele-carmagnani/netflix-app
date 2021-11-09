import React from "react";
import css from "./NavBar.module.css";

import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  
  return (
    <div
      className={
        props.isShow
          ? `${css.nav__content} ${css.nav__black}`
          : css.nav__content
      }
    >
      <div className={css.nav__content}>
        <ul>
          <NavLink to="/" >
            <li>
              <img
                className={css.logo}
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt=""
              />
            </li>
          </NavLink>
          <NavLink to="/series" activeClassName={css.active}>
            <li>Series</li>
          </NavLink>
          <NavLink to="/films" activeClassName={css.active}>
            <li>Films</li>
          </NavLink>
          <NavLink to="/latest" activeClassName={css.active}>
            <li>New & Popular</li>
          </NavLink>
          <NavLink to="/my-list" activeClassName={css.active}>
            <li>My list</li>
          </NavLink>
          <NavLink to="/profile" activeClassName={css.active}>
            <li>
              <img
                className={css.avatar}
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt=""
              />
            </li>
          </NavLink>
          
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
