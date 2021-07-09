import React, { Component } from 'react'
import axios from 'axios'

export default class CreateTask extends Component {
    constructor(props) {
        super(props);
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
                        <input 
                            type="text" 
                            name="taskname" 
                            placeholder="Task's name"
                            maxlength="40"
                            required 
                        />
                    </div>
                    <div>
                        <textarea 
                            type="text" 
                            name="taskdesc" 
                            placeholder="Brief description of the task"
                            maxlength="200"
                            required 
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            name="taskpriority" 
                            placeholder="Task priority 1-3" 
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