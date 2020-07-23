import React, {useState, useEffect} from 'react';
import './App.css';
import NewPost from './NewPost';
import Feed from './Feed';
import NavBar from './NavBar';
import Profile from './Profile';
import Settings from './Settings';
import Logout from './Logout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  const [test, setTest] = useState('hi')

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/profile" render={() => <Profile test={test} />} />
          <Route path="/newPost" exact component={NewPost} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}
