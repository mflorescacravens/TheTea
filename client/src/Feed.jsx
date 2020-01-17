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
  }));

export default function Feed() {

    //todo add hooks
    const classes = useStyles();    
    const [status, setStatus] = useState();
    
    //todo add variables
    var content;

    //todo add functions

    function getAllStatus(e) {
        e.preventDefault();
        axios.get('/allStatus').then((response) => {
            setStatus(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

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
                                component="p">Time Posted: {status.time}</Typography>
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
        <div>
            <Button variant='contained' color='primary' onClick={getAllStatus}>See your feed by clicking here!</Button>
            {content}
        </div>
    )
}