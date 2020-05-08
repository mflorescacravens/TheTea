import React from 'react';
import './App.css';
import NewPost from './NewPost';
import Feed from './Feed';
import NavBar from './NavBar';
import Profile from './Profile';
import Settings from './Settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




export default function App() {

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/newPost" exact component={NewPost} />
          <Route path="/settings" exact component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}
