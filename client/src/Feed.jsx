// Add imports
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import props from './App';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
    cardRoot: {
        flexGrow: 1
    },
    card: {
        maxWidth: 345,
        margin: 12,
        padding: theme.spacing(2)
    },
    media: {
        height: 140,
    },
    feedBox: {
        // backgroundColor: 'blue',
        justifyContent: 'center',
        margin: '0 auto',
        display: 'block',
        alignContent: 'center',

    }
}));

export default function Feed() {

    //todo add hooks
    const classes = useStyles();    
    const [status, setStatus] = useState();
    
    //todo add variables
    var content;

    //todo add functions

    // useEffect(() => {
    //     axios.get('/allStatus').then((response) => {
    //         setStatus(response.data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, [])

    function getAllStatus() {
        axios.get('/allStatus').then((response) => {
            setStatus(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        axios.get('/allStatus').then((response) => {
            console.log('re-render')
            setStatus(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    if (!status) {
        content = <p>no stuff to render'</p>
    } else {
        content = status.map((status, id) => {
            return(
                <div className={classes.cardRoot}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="#"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography 
                                gutterBottom
                                variant="h5"
                                component="h2">{status.text}</Typography>
                            <Typography 
                                variant="body2"
                                color="textSecondary"
                                component="p">Time Posted: {status.date}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            )
        })
    }

    return(
        <div className={classes.feedBox}>
            {content}
            <Button variant='contained' color='secondary' onClick={getAllStatus}>Refresh Feed/Show More<ArrowDownwardIcon /></Button>
        </div>
    )
}