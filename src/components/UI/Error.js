import React from 'react'
import css from './Error.module.css'

 const Error = (props) => {
   const{message, error} = props.onError
   console.log(props)
  return (
    <div className={css.error}>
      <h1>{message}</h1>
      <p>{error}</p>
      
    </div>
  )
}
export default Error