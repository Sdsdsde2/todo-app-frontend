import React, { Component } from 'react'
import axios from 'axios'

export default class CreateTask extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    submitTask(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/tasks", {
            task_title: event.target[0].value,
            task_info: event.target[1].value,
            task_priority: event.target[2].value
        },
        {withCredentials: true})
    }

    render() {
        return (
            <div>
                <h1>Create A New Task</h1>
                <div>
                <form onSubmit={this.submitTask}>
                    <div>
                        <label>Task Name:</label>
                        <input 
                            type="taskname" 
                            name="taskname" 
                            placeholder="CSS Styling"
                            maxlength="40"
                            required 
                        />
                    </div>
                    <div>
                        <label>Task Description:</label>
                        <textarea 
                            type="taskdesc" 
                            name="taskdesc" 
                            placeholder="Change the styling of a specific button"
                            maxlength="200"
                            required 
                        />
                    </div>
                    <div>
                        <label>Task Priority:</label>
                        <input 
                            type="taskpriority" 
                            name="taskpriority" 
                            placeholder="1-3" 
                            required 
                        />
                    </div>
                    <button type="submit">Add Task</button>
                </form>
                </div>
            </div>
        )
    }
}