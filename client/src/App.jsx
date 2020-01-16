import React from 'react';
import './App.css';
import NewPost from './NewPost';
import Feed from './Feed';
import NavBar from './NavBar';



export default function App() {

  return (
    <div className="App">
      <NavBar />
      <NewPost />
      <Feed />
    </div>
  );
}
