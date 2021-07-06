import './App.css';
import './Header.css';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import Register from './components/register';
import Login from './components/login';

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

  renderRegisterRoute() {
    if (this.state.loggedInStatus === "NOT_LOGGED_IN")
      return <Link to="/register" className="linkStyle">Register</Link>
    else if (this.state.loggedInStatus === "LOGGED_IN")
      return <Link to="/dash" className="linkStyle">Task-board</Link>
  }

  renderLoginRoute() {
    if (this.state.loggedInStatus === "NOT_LOGGED_IN")
      return <Link to="/login" className="linkStyle">Login</Link>
    else if (this.state.loggedInStatus === "LOGGED_IN")
      return <Link to="/user" className="linkStyle">Account</Link>
  }

  renderMyTaskRoute() {
    if (this.state.loggedInStatus === "NOT_LOGGED_IN")
      return
    else if (this.state.loggedInStatus === "LOGGED_IN")
      return <Link to="/home" className="linkStyle">My Tasks</Link>
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div className="header">
            <h1 className="headerMain">
                <Link to="/" className="headerMain">Basic To-do App</Link>
            </h1>
            <h3>
              <div className="headerLink">
                {this.renderRegisterRoute()}
                {this.renderLoginRoute()}
                {this.renderMyTaskRoute()}
              </div>
            </h3>
          </div>
          <Switch>
            <Route path="/register" render={props => (
              <Register {... props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
            )} />
            <Route path="/login" render={props => (
              <Login {... props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
            )} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
  }
}