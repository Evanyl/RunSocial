import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListWorkoutComponent from './components/ListWorkoutComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponet from './components/FooterComponent'
import CreateWorkoutComponent from './components/CreateWorkoutComponent';
import UpdateWorkoutComponent from './components/UpdateWorkoutComponent';


function App() {  
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path="/" exact component={ListWorkoutComponent}></Route>
              <Route path="/workouts" component={ListWorkoutComponent}></Route>
              <Route path="/add-workout" component={CreateWorkoutComponent}></Route>
              <Route path="/update-workout/:id" component={UpdateWorkoutComponent}></Route>
            </Switch>
          </div>
        <FooterComponet />
      </Router>
    </div>
  );
}

export default App;
