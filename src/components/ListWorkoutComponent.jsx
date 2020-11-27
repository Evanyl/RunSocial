import React from 'react';
import GroupService from '../services/GroupService';
import LinkerService from '../services/LinkerService';
import RunnerService from '../services/RunnerService';
import WorkoutService from '../services/WorkoutService';
import CommonComponent from './CommonComponent';

class ListWorkoutComponent extends CommonComponent {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            workouts: [],
            months: [],
            groups: [],
            username: "",
            loginKey: localStorage.getItem("loginKey"),
            weekDistance: 0,
            weekNo: 0
        }

        this.addWorkout = this.addWorkout.bind(this);
        this.editWorkout = this.editWorkout.bind(this);
        this.viewWorkout = this.viewWorkout.bind(this);
        this.toGroups = this.toGroups.bind(this);
        this.toWorkouts = this.toWorkouts.bind(this);
        this.newGroup = this.newGroup.bind(this);
        this.enterGroup = this.enterGroup.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
    }

    joinGroup() {
        this.props.history.push(`/joinGroup`)
    }

    enterGroup(id) {
        this.props.history.push(`/groups/${id}`)
    }

    newGroup() {
        this.props.history.push(`/newGroup`);
    }

    toGroups() {
        this.props.history.push("/workouts/_groups");
        this.setState({id: "_groups"});
    }
    toWorkouts() {
        this.props.history.push("/workouts/_workouts");
        this.setState({id: "_workouts"});
    }

    viewWorkout(id) {
        this.props.history.push(`/view-workout/${id}`);
    }

    editWorkout(id) {
        this.props.history.push(`/add-workout/${id}`);
    }

    componentDidMount() {
        let date = new Date();
        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
        let key = localStorage.getItem("loginKey");

        RunnerService.returnUsername(key).then(res => {
            this.setState({username: res.data});
        });

        WorkoutService.getWorkouts().then(res => {
            this.setState({workouts: res.data});
            res.data.map(workout => {
                let date = new Date(workout.yearDate, workout.monthDate, workout.dayDate);
                date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
                var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
                var thisWeekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
                if (thisWeekNo == weekNo) {
                    this.setState({ weekDistance: this.state.weekDistance + workout.distance });
                }
            });
        });

        LinkerService.groupsByUsername(this.state.loginKey).then(res => {
            res.data.map(groupLink => GroupService.getGroup(groupLink.runnerGroupId).then(res => 
                this.setState({state: this.state.groups.push(res.data)})));
        });

        this.setState({
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        })
    }

    addWorkout() {
        this.props.history.push('/add-workout/_add');
    }

    getGroup(id) {
        return GroupService.getGroup(id);
    }

    render() {
        let changeButton;
        let addButton;
        let randomButton;
        if (this.state.id == "_workouts") {
            changeButton = <button
            className="btn btn-secondary float-right"
            onClick={this.toGroups}
            style={{ marginBottom: "10px" }}
        >Groups</button>

            addButton = <button
            className="btn btn-primary"
            onClick={this.addWorkout}
            style={{ marginBottom: "10px" }}
        >Add Workout</button>
        }

        if (this.state.id == "_groups") {
            changeButton = <button
            className="btn btn-secondary float-right"
            onClick={this.toWorkouts}
            style={{ marginBottom: "10px" }}
        >Workouts</button>
        

        addButton = <button
            className="btn btn-primary"
            onClick={this.newGroup}
            style={{ marginBottom: "10px" }}
            >New Group</button>

            randomButton = <button
            className="btn btn-secondary"
            onClick={this.joinGroup}
            style={{ marginBottom: "10px" }}
            >Join Group</button>
        }

        return (
            <section className="page-section portfolio" id="portfolio" >
                <div className="container" >
                    <h2 className="text-center">{this.state.username} - {(this.state.id == "_groups") && "Groups"} {(this.state.id == "_workouts") && "Workouts"}</h2>
                    <div className="form-group">
                        {addButton}
                        {randomButton}
                        {changeButton}
                    </div>
                    <div className="list-group">
                        { (this.state.id == "_workouts") &&
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
                                        <p className="mb-1">{workout.distance.toFixed(2)}km</p>
                                    </a>
                                )
                        }

                        { (this.state.id == "_groups") &&
                            this.state.groups
                                .map(group =>
                                    <a key={group.id} className="list-group-item list-group-item-action flex-column align-items-start"
                                        onClick={() => this.enterGroup(group.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{group.name}</h5>
                                            <small>
                                                {this.state.weekDistance}/{group.weeklyDistance}km
                                            </small>
                                        </div>
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