import React, { Component } from 'react';
import CommonComponent from './CommonComponent';
import WorkoutService from '../services/WorkoutService';

class ListWorkoutComponent extends CommonComponent {
    constructor(props) {
        super(props)

        this.state = {
            workouts: []
        }

        this.addWorkout = this.addWorkout.bind(this);
        this.editWorkout = this.editWorkout.bind(this);
        this.viewWorkout = this.viewWorkout.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
    }

    deleteWorkout(id) {
        WorkoutService.deleteWorkout(id).then( res => {
            this.setState({workouts: this.state.workouts.filter(workout => workout.id != id)});
        });
    }

    viewWorkout(id) {
        this.props.history.push(`/view-workout/${id}`);
    }

    editWorkout(id) {
        this.props.history.push(`/add-workout/${id}`);
    }

    componentDidMount() {
        WorkoutService.getWorkouts().then((res) => {
            this.setState({workouts: res.data});
        });
    }

    addWorkout() {
        this.props.history.push('/add-workout/_add');
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
                                        <button style={{marginLeft: "10px"}} onClick = {() => this.viewWorkout(workout.id)} className="btn btn-info">View</button>
                                        <button style={{marginLeft: "10px"}} onClick = {() => this.editWorkout(workout.id)} className="btn btn-info">Update</button>
                                        <button style={{marginLeft: "10px"}} onClick = {() => this.deleteWorkout(workout.id)} className="btn btn-danger">Delete</button>
                                        
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