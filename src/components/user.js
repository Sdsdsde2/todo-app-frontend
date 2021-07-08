import React, { Component } from 'react'
import axios from 'axios'

export default class User extends Component {
    constructor(props) {
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dash");
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3000/logout", { withCredentials: true })
        .then(resp => {this.props.handleLogout();
        })
        .catch(error => {
            console.log("logout error", error);
        });

        this.props.history.push("/login");
    }

    logoutButton() {
        if (this.props.loggedInStatus === "LOGGED_IN")
            return <button onClick={() => this.handleLogoutClick()}>Logout</button>
    }

    render() {
        return (
            <div>
                <h1>Account Information</h1>
                <h3>Name: {this.props.user.first_name + ' ' + this.props.user.last_name}</h3>
                <h3>Username: {this.props.user.username}</h3>
                {this.logoutButton()}
            </div>
        )
    }
}