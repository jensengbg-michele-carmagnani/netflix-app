import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./ModalNotification.css";

const animationTiming = {
    enter: 400,
    exit: 1000
};

const modal = props => {
  return (
    <CSSTransition 
        mountOnEnter 
        unmountOnExit 
        in={props.show} 
        timeout={animationTiming}
        classNames={{
            enter: '',
            enterActive: 'ModalOpen',
            exit: '',
            exitActive: 'ModalClosed'
        }}>
          <div className="Modal">
            <h1>Do you want receive notification?</h1>
            <button className="Button" onClick={props.closed}>
              yes
            </button>
            <button className="Button" onClick={props.closed}>
              now
            </button>
          </div>
    </CSSTransition>
  );
};

export default modal;
