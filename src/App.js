import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListWorkoutComponent from './components/ListWorkoutComponent'
import CreateWorkoutComponent from './components/CreateWorkoutComponent';
import ViewWorkoutComponent from './components/ViewWorkoutComponent';
import LandingComponent from './components/LandingComponent';

function App() {  
  return (
      <Router>
            <Switch>
              <Route path="/" exact component={LandingComponent}></Route>
              <Route path="/workouts" component={ListWorkoutComponent}></Route>
              <Route path="/add-workout/:id" component={CreateWorkoutComponent}></Route>
              <Route path="/view-workout/:id" component={ViewWorkoutComponent}></Route>
            </Switch>
      </Router>
  );
}

export default App;
