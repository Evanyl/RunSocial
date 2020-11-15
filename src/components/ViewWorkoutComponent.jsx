import React, { Component } from 'react';
import WorkoutService from '../services/WorkoutService';

class ViewWorkoutComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            workout: {}
        }

        this.back = this.back.bind(this);
    }

    back() {
        this.props.history.push("/workouts");
    }

    componentDidMount() {
        WorkoutService.getWorkoutById(this.state.id).then( res => {
            this.setState({workout: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Workout</h3>
                    <div className="card-body">
                        <div className="row">
                            <button className="btn btn-primary" onClick={this.back}>Back</button>
                        </div>
                        <div className="row">
                            <label>Distance:</label>
                            <div>{this.state.workout.distance} </div>
                        </div>
                        <div className="row">
                            <label>Date:</label>
                            <div>{this.state.workout.dayDate}/{this.state.workout.monthDate}/{this.state.workout.yearDate} </div>
                        </div>
                        <div className="row">
                            <label>Runner Id:</label>
                            <div>{this.state.workout.runnerId} </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewWorkoutComponent;