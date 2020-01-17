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

const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function Feed(props) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    
    // add hooks
    const [status, setStatus] = useState();
    
    var content;
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
                <div>

                    <Button variant='contained' key={id}>{status.text}</Button>
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