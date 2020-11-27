import React, { Component } from 'react';
import GroupService from '../services/GroupService';
import LinkerService from '../services/LinkerService';
import WorkoutService from '../services/WorkoutService';

class GroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            distance: ""
        }
        this.cancel = this.cancel.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
    }

    saveGroup = e => {
        e.preventDefault(); 
        var letterNumber = /^[0-9a-zA-Z ]+$/;
        var number = /^[0-9.]+$/;
        if (!this.state.name.valueOf().match(letterNumber)) {
            this.setState({ error: "Please enter a valid title" });
            return;
        }

        if (!this.state.distance.toString().match(number)) {
            this.setState({ error: "Please enter a valid distance!" });
            return;
        }

        let newId = Math.floor(Math.random()*90000) + 10000;
        let newGroup = {
            id: newId,
            name: this.state.name,
            weeklyDistance: this.state.distance
        }

        
        let newLink = {
            runnerGroupId: newId,
            runnerUsername: localStorage.getItem("loginKey")
        }

        LinkerService.createLink(newLink);
        GroupService.updateGroup(newGroup).then(res => {
            this.props.history.push("/workouts/_groups");
        });
    }

    changeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    cancel() {
        this.props.history.push("/workouts/_groups");
    }

    componentDidMount() {
    }

    render() {
        
        return (
            <section className="page-section portfolio" id="portfolio">
                <div className="container">
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{ marginTop: '10px' }}>New Group</h2>
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <form>
                                <label className="text-danger">{this.state.error}</label>
                                <div className="control-group">
                                    <div className="form-group">
                                        <label>Group Name:</label>
                                        <input placeholder="Name" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeHandler} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Weekly Distance Goal (km):</label>
                                        <input placeholder="Distance" name="distance" className="form-control"
                                            value={this.state.distance} onChange={this.changeHandler} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success" onClick={this.saveGroup}>Save</button>
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

export default GroupComponent;