import React, { Component } from 'react';
import GroupService from '../services/GroupService';
import LinkerService from '../services/LinkerService';

class JoinGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            error: ""
        }

        this.cancel = this.cancel.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
    }

    joinGroup = e => {
        e.preventDefault();
        var number = /[0-9][0-9][0-9][0-9][0-9]$/;

        if (!this.state.id.toString().match(number)) {
            this.setState({ error: "Please enter a valid Group ID!" });
            return;
        }

        GroupService.checkGroupExists(this.state.id).then(res => {
            let result = res.data.success;
            if (result == true) {
                let newLink = {
                    runnerGroupId: this.state.id,
                    runnerUsername: localStorage.getItem("loginKey")
                }
                LinkerService.createLink(newLink);
                this.props.history.push("/groups/" + this.state.id);
            } else {
                this.setState({ error: "Please enter a valid Group ID!" });
                return;
            }
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
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{ marginTop: '10px' }}>Join Group</h2>
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <form>
                                <div className="control-group">
                                <label className="text-danger">{this.state.error}</label>
                                    <div className="form-group">
                                        <label>Group ID:</label>
                                        <input placeholder="Group ID" name="id" className="form-control"
                                            value={this.state.id} onChange={this.changeHandler} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={this.joinGroup}>Join</button>
                                    <button className="btn btn-secondary" onClick={this.cancel} style={{ marignLeft: "10px" }}>Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default JoinGroupComponent;