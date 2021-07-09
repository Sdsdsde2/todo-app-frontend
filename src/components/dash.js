import React, { Component } from 'react'
import TaskContainer from './task-container'

export default class Dash extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TaskContainer tasks={this.props.tasks} favoriteTask={this.props.favoriteTask}/>
            </div>
        )
    }
}
