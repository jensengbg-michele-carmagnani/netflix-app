import React from 'react'
import css from './TvSeries.module.css'


const TvSeries = (props) => {
  
const{id, name , poster_path} = props.tvSeries

  

  return (
    <div className={css.tvSeries}>
       
    </div>
  )
}

export default TvSeries
