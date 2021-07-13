import React, { Component } from 'react'
import Login from './auth/login'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/user");
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        )
    }
}