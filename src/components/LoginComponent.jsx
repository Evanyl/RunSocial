import React from 'react';
import RunnerService from '../services/RunnerService';
import CommonComponent from './CommonComponent';

class LoginComponent extends CommonComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        RunnerService.checkValidKey().then(res => {
            if (res.data.success === true) {
                this.props.history.push("/workouts");
            } else {
                localStorage.setItem("loginKey", null);
                alert("User not found!");
                this.props.history.push("/");
            }
        });
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
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LoginComponent;