// Add imports
import React, {useState, useEffect} from 'react';
import props from './App';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


export default function Feed(props) {
    // add hooks
    const [status, setStatus] = useState();
    
    function getAllStatus(e) {
        e.preventDefault();
        axios.get('/allStatus').then((response) => {
            setStatus(response.data)
            console.log(status)
        })
    }

    return(
        <div>
            <button onClick={getAllStatus}>get status'</button>
        </div>
    )
}