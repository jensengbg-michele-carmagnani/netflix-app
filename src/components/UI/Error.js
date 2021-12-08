import React from "react";
import css from "./Error.module.css";

const Error = (props) => {
  const { message, error } = props.onError;
  console.log("ERROR", props.onError);
  return (
    <div className={css.error}>
      <h1>{message}</h1>
      <p>{error && Object.keys(error).length > 0 ? error : null }</p>
    </div>
  );
};
export default Error;
