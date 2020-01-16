// Add imports
import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



export default function NewPost() {
    // add hooks
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
    
    function submitComment(e) {
        e.preventDefault()
        var newComTex = document.getElementById('outlined-multiline-static').value;
        setNewComment(newComTex);
        axios.post(newComment)
        console.log(newComTex)
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
                    />
                <Button type='submit' variant='contained' color='secondary'>Submit</Button>
            </form>
        </div>
    )
}