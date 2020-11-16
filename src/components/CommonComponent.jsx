import React, { Component } from 'react';

class CommonComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        if (!localStorage.getItem("loginKey")) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default CommonComponent;