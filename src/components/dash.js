import React, { Component } from 'react'
import axios from 'axios'
import TaskContainer from './task-container'

export default class Dash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {}
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <TaskContainer tasks={this.props.tasks} />
            </div>
        )
    }
}
