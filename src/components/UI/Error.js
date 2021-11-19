import React from 'react'
import css from './Error.module.css'

 const Error = (props) => {
   console.log('props',props)
   const{message, error} = props.onError
  return (
    <div className={css.error}>
      <h1>{message}</h1>
      <p>{error.error}</p>
    </div>
  )
}
export default Error