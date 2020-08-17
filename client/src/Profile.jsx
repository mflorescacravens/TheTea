import React from 'react';
import './App.css';

export default function Profile(props) {
    function handleChange(e) {
        props.setValue(5)
        console.log(e.target)
    }

    return (
        <div className="Profile">
            <div id="profile-section">
                <p>Account Name: Fred</p>
                <p>Posts: {props.test}</p>
                <button onClick={handleChange}>say hi in this post instead</button>
            </div>
        </div>
    );
}