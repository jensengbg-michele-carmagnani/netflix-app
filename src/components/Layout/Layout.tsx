import React, { Fragment } from "react";
import NavBar from "../Header/NavBar";
import Footer from "../footer/Footer";
import css from "./Layout.module.css";

const Layout: React.FC<{ isShow: boolean }> = (props) => {
  return (
    <Fragment>
      <NavBar isShow={props.isShow} />
      <div className={css.layout}>{props.children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
