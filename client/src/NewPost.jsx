// Add imports
import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



export default function NewPost() {
    //todo add hooks
    const useStyles = makeStyles(theme => ({
        box: {
            margin: theme.spacing(4),
            display: 'flex',
            justifyContent: 'center'
        },
        textBox: {
            width: 400,
        },
        userInputField: {
            
        }
    }));
    const classes = useStyles();
    const [newComment, setNewComment] = useState('');
    const time = new Date()

    function updateComment() {
        setNewComment(document.getElementById('outlined-multiline-static').value);
    }
    
    function submitComment(e) {
        e.preventDefault()
        axios.post('status', {
            text: newComment,
            time: time
        })
        console.log(time)
    }


    return(
        <div>
            <form onSubmit={submitComment} className={classes.box} action="POST">
                <TextField
                    className="userInputField"
                    id="outlined-multiline-static"
                    multiline
                    rows="4"
                    fullWidth={true}
                    placeholder="What's on your mind, friend?"
                    variant="filled"
                    name='comment'
                    onChange={updateComment}
                    />
                <Button type='submit' variant='contained' color='secondary'>Submit</Button>
            </form>
        </div>
    )
}