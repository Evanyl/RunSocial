import React from 'react';
import WorkoutService from '../services/WorkoutService';
import CommonComponent from './CommonComponent';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers'

import Grid from '@material-ui/core/Grid';

class CreateWorkoutComponent extends CommonComponent {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            distance: '',
            selectedDate: new Date(),
            title: "",
            error: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.saveWorkout = this.saveWorkout.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            this.setState({
                seledtedDate: new Date()
            })
        } else {
            WorkoutService.getWorkoutById(this.state.id).then(res => {
                let workout = res.data;
                this.setState({
                    distance: workout.distance,
                    title: workout.title,
                    selectedDate: new Date(workout.yearDate,
                        workout.monthDate,
                        workout.dayDate)
                });
            });
        }
    }

    handleDateChange(date) {
        this.setState({ selectedDate: date });
    }

    delete = e => {
        e.preventDefault();
        WorkoutService.deleteWorkout(this.state.id).then(res => {
            this.props.history.push("/workouts/_workouts");
        });
    }

    changeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    saveWorkout = e => {
        e.preventDefault();

        var letterNumber = /^[0-9a-zA-Z ]+$/;
        var number = /^[0-9.]+$/;
        if (!this.state.title.valueOf().match(letterNumber)) {
            this.setState({ error: "Please enter a valid title" });
            return;
        }

        if (!this.state.distance.toString().match(number)) {
            this.setState({ error: "Please enter a distance!" });
            return;
        }

        if (this.state.selectedDate <= new Date()) {
            let workout = {
                distance: this.state.distance,
                dayDate: this.state.selectedDate.getDate(),
                monthDate: this.state.selectedDate.getMonth(),
                yearDate: this.state.selectedDate.getFullYear(),
                title: this.state.title
            };
            if (this.state.id === '_add') {
                WorkoutService.createWorkout(workout).then(res => {
                    this.props.history.push('/workouts/_workouts');
                });
            } else {
                WorkoutService.updateWorkout(workout, this.state.id).then(res => {
                    this.props.history.push('/workouts/_workouts');
                });
            }
        } else {
            this.setState({ error: "That is in the future!" });
        }

    }

    cancel() {
        this.props.history.push('/workouts/_workouts');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return "Add Workout"
        } else {
            return "Update Workout"
        }
    }

    render() {
        return (
            <section className="page-section portfolio" id="portfolio">
                <div className="container">
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{ marginTop: '10px' }}>{this.getTitle()}</h2>
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <form>
                                <label className="text-danger">{this.state.error}</label>
                                <div className="control-group">
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input placeholder="Title" name="title" className="form-control"
                                            value={this.state.title} onChange={this.changeHandler} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Distance (km):</label>
                                        <input placeholder="Distance" name="distance" className="form-control"
                                            value={this.state.distance} onChange={this.changeHandler} required />
                                    </div>
                                </div>
                                <form style={{
                                                    margin:"auto",
                                                    display: "flex",
                                                    position: "relative",
                                                    justifyContent: "center"
                                                }}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                format='MM/dd/yyyy'
                                                margin='normal'
                                                id='date-picker'
                                                label="Date picker"
                                                variant='static'
                                                value={this.state.selectedDate}
                                                style={{
                                                    display: "flex"
                                                }}
                                                onChange={this.handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                </form>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    alignItems="center"
                                    justify="center"
                                >
                                    <Grid item xs={0} sm={0} m>
                                    </Grid>
                                    <Grid item xs={8} sm={3}>
                                        
                                    </Grid>
                                    <Grid item xs={0} sm={2}>
                                    </Grid>
                                </Grid>
                                <div className="form-group">
                                    <button className="btn btn-success" onClick={this.saveWorkout}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marignLeft: "10px" }}>Cancel</button>
                                    {(this.state.id !== "_add") &&
                                        <button className="btn btn-danger float-right" onClick={this.delete}>Delete</button>
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CreateWorkoutComponent;