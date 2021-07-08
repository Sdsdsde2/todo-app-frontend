import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dash");
    }

    render() {
        return (
            <div>
                <h1>Welcome To My Simple To-do App</h1>
                <h4>If you are new here you can make an account.</h4>
                <h4>If you have been here before you can press the Login button and sign in.</h4>
                <h4>Please contact shanerpersonal@gmail.com if you have any questions / issues.</h4>
                <h4>Thank you for using our service!</h4>
            </div>
        )
    }
}
