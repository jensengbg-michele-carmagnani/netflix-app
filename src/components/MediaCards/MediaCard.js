import React, { useState } from 'react'
import css from "./MediaCard.module.css";

import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { CardActionArea } from '@material-ui/core/'
import { CardActions } from '@material-ui/core/'
import { CardContent } from '@material-ui/core/'
import { CardMedia } from '@material-ui/core/'
import { Button } from '@material-ui/core/'
import { Typography } from '@material-ui/core/'

const useStyles = makeStyles({
    root: {
        width: 250,
        height: 400,
        margin: 'auto'
    },
    card: {
        height: 150
    },
    media: {
        background: 'round',
        height: '100%',
        width: '100%',
    }
})

export default function MediaCard({ image, title, tagline, genres }) {

    const css = useStyles();
    // const [showButtons, setShowButtons] = useState(true);
    return (
        <Card className={css.root}>
            <CardActionArea className={css.card}>
                <CardMedia
                    image={image}
                    title={title}
                    className={css.media}
                />
                <CardActions>
                    <Button size="small" >remove</Button>
                    <Button size="small" >thumbs up</Button>
                    <Button size="small" >thumbs down</Button>
                </CardActions>
                <CardContent>
                    <Typography gutterButton variant="h5" component="h2"> {tagline}
                    </Typography>
                    {
                        (genres && (typeof (genres.genres)) === 'object') ? (
                            genres.genres.map((gen, index) => (
                                <Typography gutterButton variant="h5" component="h2"> {gen.name}
                                </Typography>
                            ))) : (
                            <Typography gutterButton variant="h5" component="h2"> No genres
                            </Typography>
                        )}
                </CardContent>
            </CardActionArea>

        </Card >
    )
}
