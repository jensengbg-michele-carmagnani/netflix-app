import React, {useEffect, useState} from 'react'
import css from './Films.module.css'
import axios from '../../lib/axios'
import {Link} from 'react-router-dom'

const Films = (props) => {
  const { title, fetchUrl, base_url_img } = props
  const [films, setFilms] = useState([])

  useEffect(() => {
    const getMoviesHandler =async () => {
      const response = await axios.get(fetchUrl);
      setFilms(response.data.results)
    }
    getMoviesHandler()

  },[])
   console.log(`${title} ${films}`)
  return (
    <div className={css.films}>
      <h1>{title}</h1>
      <div className={css.films__postersRow}>
        {films?.map((film) => (
          <Link to={`/movies/${film.id}`}>
            <div className={css.films__poster}>
              {/* {title === "Top Twenty" && <img src={icons[0].src} alt={serie.title}/>} */}
              <img
                className={css.films__img}
                key={film.id}
                src={`${base_url_img}${film.poster_path || film.backdrop_path}`}
                alt={film.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Films
