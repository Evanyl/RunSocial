import React, { Component } from 'react';
import GroupService from '../services/GroupService';
import LinkerService from '../services/LinkerService';
import WorkoutService from '../services/WorkoutService';
import RunnerService from '../services/RunnerService';

class GroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            group: "",
            weekDistance: 0,
            weekNo: 0,
            groupLinks: [],
            memberWeeklyDistance: {},
            memberNames: {},
            error: "",
            edit: false,
            distance: 0
        }
        this.cancel = this.cancel.bind(this);
        this.editGroup = this.editGroup.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
    }

    saveGroup = e => {
        e.preventDefault();
        var number = /^[0-9.]+$/;
        if (!this.state.distance.toString().match(number)) {
            this.setState({ error: "Please enter a distance!" });
            return;
        }

        let newGroup = this.state.group;
        newGroup.weeklyDistance = parseFloat(this.state.distance).toFixed(2);
        GroupService.updateGroup(newGroup).then(res => {
            this.props.history.push("/groups/" + this.state.id);
            this.setState({ edit: false });
        });
    }

    editGroup() {
        this.setState({ edit: true });
    }

    changeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    cancel() {
        this.props.history.push("/workouts/_groups");
    }

    componentDidMount() {
        let date = new Date();
        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);

        GroupService.getGroup(this.state.id).then(res => {
            this.setState({ group: res.data });
            this.setState({ distance: res.data.weeklyDistance });
        });
        LinkerService.groupsById(this.state.id).then(res => {
            this.setState({ groupLinks: res.data })
            res.data.map(link => {
                RunnerService.returnUsername(link.runnerUsername).then(res1 => {
                    let newMemberNames = this.state.memberNames;
                    newMemberNames[link.runnerUsername] = res1.data;
                    this.setState({ memberNames: newMemberNames })
                })
            })
            res.data.map(link => {
                WorkoutService.getOtherWorkouts(link.runnerUsername).then(res1 => {
                    let newMemberDistance = this.state.memberWeeklyDistance;
                    let previousDistance = newMemberDistance[link.runnerUsername]
                    if (newMemberDistance[link.runnerUsername] == undefined) {
                        previousDistance = 0;
                    }
                    newMemberDistance[link.runnerUsername] = previousDistance;
                    this.setState({ memberWeeklyDistance: newMemberDistance });
                    res1.data.map(workout => {
                        let date = new Date(workout.yearDate, workout.monthDate, workout.dayDate);
                        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
                        var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
                        var thisWeekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
                        if (thisWeekNo == weekNo) {
                            let newMemberDistance = this.state.memberWeeklyDistance;
                            let previousDistance = newMemberDistance[link.runnerUsername]
                            if (newMemberDistance[link.runnerUsername] == undefined) {
                                previousDistance = 0;
                            }
                            newMemberDistance[link.runnerUsername] = parseFloat(previousDistance) + workout.distance;
                            this.setState({ memberWeeklyDistance: newMemberDistance });
                        }
                    })
                });
            });
        });

        WorkoutService.getWorkouts().then(res => {
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
    }

    render() {
        let button;
        let form;
        if (this.state.edit) {
            form = <div className="control-group">
                <div className="form-group">
                    <label>Weekly Distance (km):</label>
                    <input placeholder="Distance" name="distance" className="form-control"
                        value={this.state.distance} onChange={this.changeHandler} required />
                </div>
            </div>

            button = <button className="btn btn-success" onClick={this.saveGroup}>Save</button>
        } else {
            button = <button className="btn btn-primary" onClick={this.editGroup}>Edit</button>
        }


        return (
            <section className="page-section portfolio" id="portfolio">
                <div className="container">
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{ marginTop: '10px' }}>{this.state.group.name}</h2>
                    <section className="page-section portfolio" id="portfolio">
                        <div className="container">
                            <h2 className="page-section-heading text-center text-secondary mb-0" style={{ marginTop: '10px' }}>
                                {this.state.weekDistance.toFixed(2)}/{parseFloat(this.state.group.weeklyDistance).toFixed(2)} km
                            </h2>
                            <h3 className=" text-center text-secondary mb-0" style={{ marginTop: '15px' }}>completed for the week.</h3>
                        </div>
                    </section>
                    <div className="col-lg-8 mx-auto">
                        <label className="text-danger">{this.state.error}</label>
                        {form}
                        {button}
                        <button className="btn btn-secondary float-right" onClick={this.cancel} style={{ marignLeft: "10px" }}>Back</button>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <form>
                                <h3 className=" text-center text-secondary mb-0" style={{ marginTop: '15px' }}>Invite ID: {this.state.group.id}</h3>
                                <div className="list-group overflow-auto">
                                    {
                                        this.state.groupLinks
                                            .map(groupLink =>
                                                <li key={groupLink.id} className="list-group-item list-group-item-action flex-column align-items-start">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{this.state.memberNames[groupLink.runnerUsername]}</h5>
                                                        <small>
                                                            {parseFloat(this.state.memberWeeklyDistance[groupLink.runnerUsername]).toFixed(2)}
                                                            /{parseFloat(this.state.group.weeklyDistance).toFixed(2)} km
                                                            { }
                                                        </small>
                                                    </div>
                                                </li>
                                            )
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

export default GroupComponent;