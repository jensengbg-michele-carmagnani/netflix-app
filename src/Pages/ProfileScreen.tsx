import React from 'react'
import css from './PorfileScreen.module.css'
import ProfileForm from "../components/profile/ProfileForm";
 const Profile:React.FC = () => {
  return (
    <div className={css.profile}>
      <ProfileForm/>
    </div>
  )
 }
export default Profile
