import React from 'react';
import './App.css';

export default function Profile(props) {
    // console.log(props)
    return (
        <div className="Profile">
            <div id="profile-section">
                <p>Account Name: Fred</p>
                <p>Posts: {props.test}</p>
            </div>
        </div>
    );
}