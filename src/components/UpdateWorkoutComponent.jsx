import React, { Component } from 'react';
import WorkoutService from '../services/WorkoutService';

class UpdateWorkoutComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            distance: '',
            dayDate: '',
            monthDate: '',
            yearDate: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateWorkout = this.updateWorkout.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        WorkoutService.getWorkoutById(this.state.id).then(res => {
            let workout = res.data;
            this.setState({
                    distance: workout.distance,
                    dayDate: workout.dayDate,
                    monthDate: workout.monthDate,
                    yearDate: workout.yearDate
            })
        });
    }

    changeHandler = (event) => {
        const{name, value} = event.target;
        this.setState({[name]: value})
    }

    updateWorkout = e => {
        e.preventDefault();
        let workout = {distance: this.state.distance, dayDate: this.state.dayDate, monthDate: this.state.monthDate, yearDate: this.state.yearDate};
        console.log('workout => ' + JSON.stringify(workout));
        WorkoutService.updateWorkout(workout, this.state.id).then(res => {
            this.props.history.push('/workouts');
        });
    }

    cancel() {
        this.props.history.push('/workouts');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Workout</h3>
                            <div className="cardbody">
                                <form>
                                    <div className="form-group">
                                        <label>Distance</label>
                                        <input placeholder="Distance" name="distance" className="form-control" 
                                        value={this.state.distance} onChange={this.changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Day</label>
                                        <input placeholder="Day" name="dayDate" className="form-control" 
                                        value={this.state.dayDate} onChange={this.changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Month</label>
                                        <input placeholder="Month" name="monthDate" className="form-control" 
                                        value={this.state.monthDate} onChange={this.changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input placeholder="Year" name="yearDate" className="form-control" 
                                        value={this.state.yearDate} onChange={this.changeHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateWorkout}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{marignLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateWorkoutComponent;