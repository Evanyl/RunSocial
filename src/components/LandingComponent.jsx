import React, { Component } from 'react';
import '../App.css';

class LandingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            key: ""
        }

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = e => {
        this.setState({ key: e.target.value });
    }

    login() {
        localStorage.setItem("loginKey", this.state.key);
        this.props.history.push("/login");
    }

    register() {
        this.props.history.push("/register");
    }

    render() {
        return (
            <div>
                <header className="masthead bg-primary text-white text-center">
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Run Social</h1>
                        <div className="divider-custom divider-light">
                            <div className="divider-custom-line"></div>
                        </div>
                        <p className="masthead-subheading font-weight-light mb-0">Run Social is a hassle-free way to log your workout data. Quick registration, and an easy interface gets you to tracking your progress right away!</p>
                    </div>
                </header>

                <section className="page-section portfolio" id="portfolio">
                    <div className="container">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Sign in</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <form>
                                    <div className="control-group">
                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                            <label>Username</label>
                                            <input onChange={this.changeHandler} className="form-control" name="key" value={this.state.key} placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-xl" onClick={this.login}>Login</button>
                                        <button className="btn btn-secondary btn-xl" onClick={this.register}>Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LandingComponent;