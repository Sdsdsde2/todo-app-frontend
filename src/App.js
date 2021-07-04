import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import Register from './components/register'

export default class App extends Component{
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/user");
  }

  checkLoginStatus() {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
    .then(resp => {
      if (resp.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN")
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: resp.data.user
        })
      else if (!resp.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => console.log("Login error", error))
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div className="headerLink">
            <h3>
              <Link to="/home" className="linkStyle">Home</Link>
              <Link to="/login" className="linkStyle">Login</Link>
              <Link to="/register" className="linkStyle">Register</Link>
            </h3>
          </div>
          <Switch>
            <Route path="/register" render={props => (
              <Register {... props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
            )} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
  }
}