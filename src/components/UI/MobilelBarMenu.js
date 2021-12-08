import React from "react";
import { NavLink } from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./MobilelBarMenu.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const MobilelBarMenu = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "MobileOpen",
        exit: "",
        exitActive: "MobileClosed",
      }}
    >
      <>
        {/* <div className="Backdroop"/> */}
        <div className="MobileBarMenu">
          <div className="navMobile__content">
            <ul>
              <NavLink
                to="/series"
                onClick={() => props.closed()}
                activeClassName="active"
              >
                <li>Series</li>
              </NavLink>
              <NavLink
                to="/films"
                onClick={() => props.closed()}
                activeClassName="active"
              >
                <li>Films</li>
              </NavLink>
              <NavLink
                to="/latest"
                onClick={() => props.closed()}
                activeClassName="active"
              >
                <li>New & Popular</li>
              </NavLink>
              <NavLink
                to="/myfavorites"
                onClick={() => props.closed()}
                activeClassName="active"
              >
                <li>My list</li>
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => props.closed()}
                activeClassName="active"
              >
                <li>Setting profile</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </>
    </CSSTransition>
  );
};

export default MobilelBarMenu;
