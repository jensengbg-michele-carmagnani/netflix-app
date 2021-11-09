import React from 'react'
import css from './PorfileScreen.module.css'
import ProfileForm from "../components/profile/ProfileForm";
 const Profile = () => {
  return (
    <div className={css.profile}>
      <ProfileForm/>
    </div>
  )
 }
export default Profile
