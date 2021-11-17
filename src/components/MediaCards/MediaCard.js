import React from 'react'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { CardActionArea } from '@material-ui/core/'
import { CardActions } from '@material-ui/core/'
import { CardContent } from '@material-ui/core/'
import { CardMedia } from '@material-ui/core/'
import { Button } from '@material-ui/core/Button'
import { Typography } from '@material-ui/core/'


const useStyles = makeStyles({
    root: {
        width: 250,
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
export default function MediaCard({ image, title, description }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.card}>
                <CardMedia
                    image={image}
                    title={title}
                    className={classes.media}
                />
                {/* <CardContent>
                    <Typography gutterButton variant="h5" component="h2"> {title}
                    </Typography>
                    <Typography variant="body2" color="red" component="p">
                        {description}
                    </Typography>
                </CardContent> */}
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="red">Add</Button>
                <Button size="small" color="red">learn more</Button>
            </CardActions> */}
        </Card>
    )
}
