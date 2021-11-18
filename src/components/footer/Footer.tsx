import React from "react";
import css from "./Footer.module.css";
import facebook from "../../Assets/logo-facebook.svg";
import instagram from "../../Assets/logo-instagram.svg";
import linkedin from "../../Assets//logo-linkedin.svg";
import youtube from "../../Assets/logo-youtube.svg";

const Footer: React.FC = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footer__wrapper}>
        <section>
          <article className={css.footer__socialmedia}>
            <img src={facebook} alt="" />
            <img src={instagram} alt="" />
            <img src={linkedin} alt="" />
            <img src={youtube} alt="" />
          </article>
          <h5>Audio and Subtitles</h5>
          <h5>Media Center</h5>
          <h5>Privacy</h5>
          <h5>Contact Us</h5>
        </section>
        <section>
          <h5>Audio Description</h5>
          <h5>Investor Relations</h5>
          <h5>Legal Notices</h5>
        </section>
        <section>
          <h5>Help Center</h5>
          <h5>Jobs</h5>
          <h5>Cookie Preferences </h5>
        </section>
        <section>
          <h5>Gift Cards</h5>
          <h5>Terms of use</h5>
          <h5>Corporate Information </h5>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
