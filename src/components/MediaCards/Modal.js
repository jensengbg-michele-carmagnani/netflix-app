import React from 'react'
import css from "./Modal.module.css";
import { CardContent } from '@material-ui/core/'
import { Typography } from '@material-ui/core/'
import { CardActions } from '@material-ui/core/'


const Modal = ({ showModal, setShowModal, movie }) => {
    console.log(movie)
    return <> {showModal ? < CardContent className={css.modalBox}>
        <CardActions className={css.cardActions}>
            {(movie && (typeof (movie.genres)) === 'object') ? (
                movie.genres.map((gen, index) => (
                    <Typography
                        className={css.genres}
                        key={index}
                        gutterButton variant="h6"
                        component="h5"
                        noWrap> {gen.name}
                        {(index === (movie.genres.length - 1)) ? (
                            <span></span>) : (
                            <span className={css.dot}></span>
                        )}
                    </Typography>
                ))) : (
                <Typography gutterButton variant="h5" component="h2"> No genres
                </Typography>
            )}

            <p
                className={css.tagline}
            > {movie.tagline}
            </p>
            <p
                className={css.vote}
            > Rating: {movie.vote_average}
            </p>
        </CardActions>
    </ CardContent > : null}</>
};

export default Modal;
