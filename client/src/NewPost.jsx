// Add imports
import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function NewPost() {
    //todo add hooks
    const useStyles = makeStyles(theme => ({
        box: {
            flexGrow: 1,
            margin: theme.spacing(4),
            display: 'flex',
            justifyContent: 'center',
            width: 400
        },
        paper: {
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            backgroundColor: 'rgb(26, 40, 75)',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },        

    }));
    const classes = useStyles();
    const [newComment, setNewComment] = React.useState('');
    const [emotion, setEmotion] = React.useState('');
    const [picture, setPicture] = React.useState();

    function updateComment() {
        setNewComment(document.getElementById('outlined-multiline-static').value);
    }
    
    function submitComment(e) {
        e.preventDefault()
        axios.post('status', {
            text: newComment,
            emotion: emotion,
            picture: picture,
        })
        document.getElementById('outlined-multiline-static').value = '';
    }

    function handleEmotionChange(e) {
        e.preventDefault();
        setEmotion(e.target.value);
    };

    function handlePhotoUpload(e) {
        setPicture(e.target.value)
    }


    return(
        <div>
            <Paper className={classes.paper} variant='outlined'>
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
                <FormControl className={classes.formControl}>
                    <Select value={emotion} onChange={handleEmotionChange} displayEmpty className={classes.selectEmpty}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='Happy 😊'>Happy 😊</MenuItem>
                        <MenuItem value='Sad 😢'>Sad 😢</MenuItem>
                        <MenuItem value='Smart 🤓'>Smart 🤓</MenuItem>
                    </Select>
                    <FormHelperText>Pick an emotion!</FormHelperText>
                </FormControl>
                <Button type="file" name="pic" accept="image/*" onChange={handlePhotoUpload} />
            </Paper>
        </div>
    )
}