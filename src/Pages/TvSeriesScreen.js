import React from 'react'

import TvSeries from "../components/TvSeries/TvSeries"
import css from "./TvSeriesScreen.module.css"
const TvSeriesScreen = () => {
  
  return (
    <div className={css.tvSeriesScreen}>
      <TvSeries />
    </div>
  )
}

export default TvSeriesScreen
