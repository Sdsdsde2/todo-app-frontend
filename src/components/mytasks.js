import React, { Component } from 'react'
import axios from 'axios'
import MyTaskContainer from './my-task-container'

export default class MyTasks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MyTaskContainer tasks={this.props.tasks} />
            </div>
        )
    }
}
