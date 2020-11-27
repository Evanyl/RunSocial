import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListWorkoutComponent from './components/ListWorkoutComponent'
import CreateWorkoutComponent from './components/CreateWorkoutComponent';
import LandingComponent from './components/LandingComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import Header from './components/Header';
import GroupComponent from './components/GroupComponent';
import CreateGroupComponent from './components/CreateGroupComponent';
import JoinGroupComponent from './components/JoinGroupComponent';

function App() {

  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route path="/" exact component={LandingComponent}></Route>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/register" component={RegisterComponent}></Route>
          <Route path="/workouts/:id" component={ListWorkoutComponent}></Route>
          <Route path="/add-workout/:id" component={CreateWorkoutComponent}></Route>
          <Route path="/groups/:id" component={GroupComponent}></Route>
          <Route path="/newGroup" component={CreateGroupComponent}></Route>
          <Route path="/joinGroup" component={JoinGroupComponent}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
