import React, { Component } from 'react';
import '../App.css';
import RunnerService from '../services/RunnerService';
import WorkoutService from '../services/WorkoutService';

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
        this.setState({key: e.target.value});
    }

	login() {
        WorkoutService.setLoginKey(this.state.key);
        RunnerService.setLoginKey(this.state.key);

        RunnerService.checkValidKey()
        .then(res => {
            alert("skeet");
        });

	}

	register() {
        console.log("register");
	}
	
    render() {
        return (
            <div>
				<nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">Run Social</a>
            </div>
        </nav>

        <header class="masthead bg-primary text-white text-center">
            <div class="container d-flex align-items-center flex-column">
                <h1 class="masthead-heading text-uppercase mb-0">Run Social</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                </div>
				<p class="masthead-subheading font-weight-light mb-0">Run Social is a hassle-free way to log your workout data. Quick registration, and easy interface gets you to tracking your progress right away!</p>
            </div>
        </header>

        <section class="page-section portfolio" id="portfolio">
            <div class="container">
			<h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Sign in</h2>
                <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                </div>
				<div class="row">
                    <div class="col-lg-8 mx-auto">
                        <form>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                                    <label>Login Key</label>
                                    <input onChange={this.changeHandler} class="form-control" name="key" value={this.state.key} placeholder="Login Key"/>
                                </div>
                            </div>
                            <div class="form-group">
								<button class="btn btn-primary btn-xl" onClick={this.login}>Login</button>
								<button class="btn btn-secondary btn-xl" onClick={this.register}>Register</button>
							</div>
                        </form>
                  </div>
                </div>
            </div>
        </section>

        <div class="copyright py-4 text-center text-white">
            <div class="container"><small>Evan Liu</small></div>
        </div>	
			</div>
        );
    }
}

export default LandingComponent;