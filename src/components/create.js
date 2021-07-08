import React, { Component } from 'react'
import axios from 'axios'

export default class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitReview(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/reviews", {
            subscription_id: event.target[0].value,
            user_id: event.target[1].value,
            rating: event.target[2].value
        },
        {withCredentials: true})
    }

    render() {
        return (
            <div>
                <h1>Create A New Task</h1>
                <div>
                <form onSubmit={this.submitReview}>
                    <label>Task Name:</label>
                    <input 
                        type="taskname" 
                        name="taskname" 
                        placeholder={this.state.subscription_id}
                        required 
                    />
                    <label>Task Description:</label>
                    <input 
                        type="taskdesc" 
                        name="taskdesc" 
                        placeholder={this.props.user.id}
                        required 
                    />
                    <label>Task Priority:</label>
                    <input 
                        type="taskpriority" 
                        name="taskpriority" 
                        placeholder="1-3" 
                        required 
                    />
                    <button type="submit">Submit Review</button>
                </form>
                </div>
            </div>
        )
    }
}