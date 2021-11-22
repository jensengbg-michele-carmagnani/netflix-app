import React, { useState } from 'react'
import css from "./MediaCard.module.css";

import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { CardActionArea } from '@material-ui/core/'
import { CardMedia } from '@material-ui/core/'
import Modal from './Modal'


// const useStyles = makeStyles({
//     root: {
//         width: 250,
//         height: 150,
//         margin: 'auto'
//     },
//     card: {
//         height: 150
//     },
//     media: {
//         background: 'round',
//         height: '100%',
//         width: '100%',
//     }
// })

export default function MediaCard({ id, image, title, tagline, movie }) {
    // const css = useStyles();
    const [showModal, setShowModal] = useState(false);

    function handleClose() {
        console.log("close modal")
        setShowModal(null)
    }

    function handleOpen(event) {
        console.log("open modal")
        setShowModal(prev => !prev)
    }

    if (id) {
        return (
            <Card className={css.root}>
                <CardActionArea className={css.card}>
                    <CardMedia
                        image={image}
                        title={title}
                        className={css.media}
                        onMouseOver={handleOpen}
                        onMouseLeave={handleClose}
                    />
                    <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        movie={movie}
                        className={css.ModalCall}
                    />

                    <div className={css.image__overlay}>

                        {/* <div onMouseEnter={() => setIsShown(true)}>
                        {isShown && (
                            <CardContent >
                                <CardActions>
                                    <Button size="small" >thumbs up</Button>
                                    <Button size="small" >thumbs down</Button>
                                </CardActions>

                                <Typography gutterButton variant="h5" component="h2"> {tagline}
                                </Typography>

                                {(genres && (typeof (genres.genres)) === 'object') ? (
                                    genres.genres.map((gen, index) => (
                                        <Typography key={index} gutterButton variant="h5" component="h2"> {gen.name}
                                        </Typography>
                                    ))) : (
                                    <Typography gutterButton variant="h5" component="h2"> No genres
                                    </Typography>
                                )}
                            </CardContent>
                        )}
                    </div> */}
                    </div>
                </CardActionArea>
            </Card >
        )
    }
    else {
        console.log("No cards to display")
        return (
            <Card></Card>
        )
    }
}