import React from 'react'
import MyList from "../components/MyList/MyList"

import css from "./MyList.module.css";

const MyListScreen: React.FC = () => {
  return (
    <div className={css.MyListScreen}>
      <MyList />
    </div>
  );
};

export default MyListScreen; 
