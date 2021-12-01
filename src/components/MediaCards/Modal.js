import React from 'react'
import css from "./Modal.module.css";
import { CardContent } from '@material-ui/core/'
import { Typography } from '@material-ui/core/'
import { CardActions } from '@material-ui/core/'


const Modal = ({ showModal, movie }) => {

    return <> {showModal ? < CardContent className={css.modalBox}>
        <CardActions className={css.modalBox__cardActions}>
            {(movie && (typeof (movie.genres)) === 'object') ? (
                movie.genres.map((gen, index) => (
                    <Typography
                        className={css.modalBox__genres}
                        key={index}
                        component="h5"
                        noWrap> {gen.name}
                        {(index === (movie.genres.length - 1)) ? (
                            <span></span>) : (
                            <span className={css.modalBox__dot}></span>
                        )}
                    </Typography>
                ))) : (
                <Typography gutterButton variant="h5" component="h2"> No genres
                </Typography>
            )}
            <CardActions className={css.modalBox__tagAndVote}>
                <Typography
                    gutterButton variant="h5"
                    component="h2"
                    className={css.modalBox__tagline}> {movie.tagline}
                </Typography>
                <Typography
                    gutterButton variant="h5"
                    component="h2"
                    className={css.modalBox__vote}> Rating: {movie.vote_average}
                </Typography>
            </CardActions>
        </CardActions>
    </CardContent> : null}</>
};

export default Modal;
