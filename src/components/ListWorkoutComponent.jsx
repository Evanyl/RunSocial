import React from 'react';
import RunnerService from '../services/RunnerService';
import WorkoutService from '../services/WorkoutService';
import CommonComponent from './CommonComponent';

class ListWorkoutComponent extends CommonComponent {
    constructor(props) {
        super(props)

        this.state = {
            workouts: [],
            months: [],
            username: "",
        }

        this.addWorkout = this.addWorkout.bind(this);
        this.editWorkout = this.editWorkout.bind(this);
        this.viewWorkout = this.viewWorkout.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }

    getUsername() {

    }

    viewWorkout(id) {
        this.props.history.push(`/view-workout/${id}`);
    }

    editWorkout(id) {
        this.props.history.push(`/add-workout/${id}`);
    }

    componentDidMount() {
        let key = localStorage.getItem("loginKey");

        RunnerService.returnUsername(key).then(res => {
            this.setState({username: res.data});
        });
        WorkoutService.getWorkouts().then((res) => {
            this.setState({ workouts: res.data });
        });

        this.setState({
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        })
    }

    addWorkout() {
        this.props.history.push('/add-workout/_add');
    }

    render() {
        return (
            <section className="page-section portfolio" id="portfolio" >
                <div className="container" >
                    <h2 className="text-center">Welcome {this.state.username}!</h2>
                    <div className="row">
                        <button
                            className="btn btn-primary"
                            onClick={this.addWorkout}
                            style={{ marginBottom: "10px" }}
                        >Add Workout</button>
                    </div>
                    <div className="list-group">
                        {
                            this.state.workouts
                                .sort((a, b) => {
                                    let dateA = new Date(a.yearDate, a.monthDate, a.dayDate);
                                    let dateB = new Date(b.yearDate, b.monthDate, b.dayDate)
                                    if (dateA > dateB) {
                                        return -1;
                                    } else if (dateA < dateB) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                })
                                .map(workout =>
                                    <a key={workout.id} className="list-group-item list-group-item-action flex-column align-items-start"
                                        onClick={() => this.editWorkout(workout.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{workout.title}</h5>
                                            <small>
                                                {
                                                    this.state.months[workout.monthDate] +
                                                    " " +
                                                    workout.dayDate +
                                                    ", " +
                                                    workout.yearDate
                                                }
                                            </small>
                                        </div>
                                        <p className="mb-1">{workout.distance.toFixed(2) + "km"}</p>
                                    </a>
                                )
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default ListWorkoutComponent;    