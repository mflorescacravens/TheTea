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
        flexGrow: 1,
        display: 'flex',
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
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4)
    },
}));

export default function Feed() {

    const classes = useStyles();    
    const [status, setStatus] = useState();
    
    var content;

    function shuffleArr(arr) {
        var j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }

    useEffect(() => {
        axios.get('/allStatus').then((response) => {
            setStatus(shuffleArr(response.data))
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    if (!status) {
        content = <p>hi</p>
    } else {
        content = status.map((status, id) => {
            return(
                <div className={classes.cardRoot}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="#"
                                title="Picture"
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
                        {/* <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions> */}
                    </Card>
                </div>
            )
        })
    }

    return(
        <div className={classes.feedBox}>
            {content}
        </div>
    )
}