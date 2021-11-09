import React from "react";
import css from "./ProfileForm.module.css";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import PlanScreen from "./PlanScreen";

const ProfileForm = () => {
  const user = useSelector(selectUser);
  const signOut = () => {
    auth.signOut().catch((error) => {
      alert(error.message);
    });
  };
  return (
    <div className={css.profileForm}>
      <h1>Edit Profile</h1>
      <div className={css.profileForm__line} />
      <section className={css.profileForm__header}>
        <article className={css.profileForm__info}>
          <img
            className={css.profileForm__avatar}
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <p> {user.email} </p>
        </article>
      </section>
      <section className={css.profileForm__body}>
        <h3>Plans</h3>
        <div className={css.profileForm__line2} />
        <PlanScreen />
        <button onClick={signOut} className={css.profileForm__signout}>
          <a className={css.profileForm__link} href="/login">Sign out</a>
        </button>
      </section>
    </div>
  );
};

export default ProfileForm;
