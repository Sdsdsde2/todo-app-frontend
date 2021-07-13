import React, { Component } from 'react'
import axios from 'axios'
import MyTaskContainer from './my-task-container'

export default class MyTasks extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN")
            this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <MyTaskContainer tasks={this.props.tasks} user={this.props.user} />
            </div>
        )
    }
}
