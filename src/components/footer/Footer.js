import React, { useState } from "react";
import css from "./Footer.module.css";

import {
  faFacebook,
  faInstagramSquare,
  faYoutubeSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const [color, setColor] = useState(null);
  const colorHandler = () => {
    color ? setColor((prevState) => !prevState) : setColor("white");
  };

  // const brands = [faFacebook, faInstagramSquare, faYoutubeSquare, faLinkedin];
  
  return (
    <footer className={css.footer}>
      <div className={css.footer__wrapper}>
        <section>
          <article className={css.footer__socialmedia}>
             {/* {brands.map((brand, i) => {
                console.log('prefix',brand)
            return  (<FontAwesomeIcon
                key={i}
                icon={brand[i]}
                size="3x"
                className={css.footer___fontAwesome}
                onMouseLeave={colorHandler}
                onMouseOver={colorHandler}
                color={color}
              />)
            }
            )}  */}
            
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              color="white"
              className={css.footer___fontAwesome}
              // onMouseLeave={colorHandler}
              // onMouseOver={colorHandler}
              // color={color}
            />
            <FontAwesomeIcon
              icon={faInstagramSquare}
              size="2x"
              color="white"
              className={css.footer___fontAwesome}
              // onMouseLeave={colorHandler}
              // onMouseOver={colorHandler}
              // color={color}
            />
            <FontAwesomeIcon
              icon={faYoutubeSquare}
              size="2x"
              color="white"
              className={css.footer___fontAwesome}
              // onMouseLeave={colorHandler}
              // onMouseOver={colorHandler}
              // color={color}
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              color="white"
    
              // onMouseLeave={colorHandler}
              // onMouseOver={colorHandler}
              // color={color}
            />
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
