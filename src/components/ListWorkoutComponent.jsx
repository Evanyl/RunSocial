import React, { Component } from 'react';
import WorkoutService from '../services/WorkoutService';

class ListWorkoutComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workouts: []
        }

        this.addWorkout = this.addWorkout.bind(this);
        this.editWorkout = this.editWorkout.bind(this);
    }

    editWorkout(id) {
        this.props.history.push(`/update-workout/${id}`);
    }

    componentDidMount() {
        WorkoutService.getWorkouts().then((res) => {
            this.setState({workouts: res.data});
        });
    }

    addWorkout() {
        this.props.history.push('/add-workout');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Workouts</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addWorkout}>Add Workout</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Distance</th>
                            <th>Runner Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.workouts.map(
                                workout => 
                                <tr key = {workout.id}>
                                    <td> {workout.dayDate}</td>
                                    <td> {workout.monthDate}</td>
                                    <td> {workout.yearDate}</td>
                                    <td> {workout.distance}</td>
                                    <td> {workout.runnerId}</td>
                                    <td>
                                        <button onClick = {() => this.editWorkout(workout.id)} className="btn btn-info">Update</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ListWorkoutComponent;    