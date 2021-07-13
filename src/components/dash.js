import React, { Component } from 'react'
import TaskContainer from './task-container'

export default class Dash extends Component {
    constructor(props) {
        super(props);
    }

    checkLogin() {
        if (this.props.loggedInStatus === "LOGGED_IN")
            return <TaskContainer tasks={this.props.tasks} favoriteTask={this.props.favoriteTask}/>
        if (this.props.loggedInStatus === "NOT_LOGGED_IN")
            this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                {this.checkLogin()}
            </div>
        )
    }
}
