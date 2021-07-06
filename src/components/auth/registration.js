import React, { Component } from 'react'
import axios from 'axios';

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            password_confirmation: "",
            registerErrors: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/registrations", {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        },
        {withCredentials: true})
        .then(resp => {
            if (resp.data.status === 'created') 
                this.props.handleSuccessfulAuth(resp.data)
            })
        .catch(error => console.log("Registration Errors:", error))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="first_name" 
                        name="first_name" 
                        placeholder="First Name" 
                        value={this.state.first_name} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="last_name" 
                        name="last_name" 
                        placeholder="Last Name" 
                        value={this.state.last_name} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="username" 
                        name="username" 
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="Confirm Password" 
                        value={this.state.password_confirmation} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}
