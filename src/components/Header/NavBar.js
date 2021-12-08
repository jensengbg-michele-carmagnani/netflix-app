import React, { useState, useEffect } from "react";
import MobileBarMenu from "../UI/MobilelBarMenu";
import css from "./NavBar.module.css";

import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  const [screenWidth, setScreenWidth] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [changeIconManu, setChangeIconManu] = useState(false);

  useEffect(() => {
    getScreenWidth();
  });
  console.log(changeIconManu);
  const getScreenWidth = () => {
    const actualScreenWidth = window.screen.width;
    if (actualScreenWidth <= 414) {
      setIsMobile(true);
    }
  };

  const showMobileNav = () => {
    setOpenMobileNav(true);
  };

  const closeModal = async () => {
    await setOpenMobileNav(prevState =>!prevState);
  };
  const closeIconManu = () => {
    setChangeIconManu(!changeIconManu)
  }
  return (
    <>
      <div
        className={
          props.isShow
            ? `${css.nav__content} ${css.nav__black}`
            : css.nav__content
        }
      >
        <div className={css.nav__content}>
          <ul>
            <NavLink to="/">
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
            <NavLink to="/myfavorites" activeClassName={css.active}>
              <li>My list</li>
            </NavLink>
            <NavLink to="/profile" activeClassName={css.active}>
              <li >
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
      <div
        onClick={() => {
          showMobileNav();
          setChangeIconManu(!changeIconManu);
          openMobileNav && closeModal()
        }}
        className={css.navMobile__content}
      >
        <div className={changeIconManu && css.navMobile___first}></div>
        <div className={changeIconManu && css.navMobile___second}></div>
        <div className={changeIconManu && css.navMobile___third}></div>
      </div>
      <MobileBarMenu show={openMobileNav} closed={closeModal} onChangeIconManu={closeIconManu}/>
    </>
  );
};

export default NavBar;
