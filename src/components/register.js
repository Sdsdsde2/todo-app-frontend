import React, { Component } from 'react'
import Registration from './auth/registration'

export default class Register extends Component {
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
                <h1>Create An Account</h1>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        )
    }
}
