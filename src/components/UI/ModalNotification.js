import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./ModalNotification.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const modal = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
    >
      <>
        {/* <div className="Backdroop"/> */}
        <div className="Modal">
          <h1>Cookie Policy</h1>
          <section>
            We use cookies and similar methods to recognize visitors and
            remember their preferences. We also use them to measure ad campaign
            effectiveness, target ads and analyze site traffic. To learn more
            about these methods, including how to disable them, view our Cookie
            Policy. Starting on July 20, 2020 we will show you ads we think are
            relevant to your interests, based on the kinds of content you access
            in our Services. You can object. For more info, see our privacy
            policy. By tapping ‘accept,’ you consent to the use of these methods
            by us and third parties. You can always change your tracker
            preferences by visiting our Cookie Policy.
          </section>
          <button
            className="Modola__button"
            onClick={() => props.closed("Granted")}
          >
            yes
          </button>
          <button
            className="Modola__button"
            onClick={() => props.closed("Denied")}
          >
            no
          </button>
          <button
            className="Modola__button"
            onClick={() => props.closed("Denied")}
          >
            Personalize
          </button>
        </div>
      </>
    </CSSTransition>
  );
};

export default modal;
