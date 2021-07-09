import React, { Component } from 'react'
import axios from 'axios'
import TaskContainer from './task-container'

export default class MyTasks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TaskContainer tasks={this.props.tasks} />
            </div>
        )
    }
}
