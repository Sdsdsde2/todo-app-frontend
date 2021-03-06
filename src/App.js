import './App.css';
import './Header.css';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import Home from './components/home';
import Dash from './components/dash';
import Register from './components/register';
import Login from './components/login';
import User from './components/user';
import CreateTask from './components/create';
import MyTasks from './components/mytasks';

export default class App extends Component{
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      tasks: {},
      userTasks: {}
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
      if (resp.data.logged_in && this.state.loggedInStatus === "LOGGED_IN")
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: resp.data.user
        })
      else if (!resp.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
        this.props.history.push("/login");
      }
    })
    .catch(error => console.log("Login error", error))
  }

  fetchTasks = () => {
    axios.get("http://localhost:3000/tasks")
    .then(resp => {
      return this.setState({tasks: resp.data.tasks})
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
    this.fetchTasks();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
      userTasks: data.user.tasks
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
      return <Link to="/mytasks" className="linkStyle">My Tasks</Link>
  }

  renderCreateTaskRoute() {
    if (this.state.loggedInStatus === "NOT_LOGGED_IN")
      return
    else if (this.state.loggedInStatus === "LOGGED_IN")
      return <Link to="/create" className="linkStyle">Add Task</Link>
  }

  renderNewTask(newTask) {
    this.setState({
      tasls: [...this.state.tasks, newTask]
    })
  }

  favoriteTask = (task) => {
    var tasksuser = {
      user_id: this.state.user.id,
      task_id: task.id
    }

    fetch(`http://localhost:3000/tasksusers`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(tasksuser)
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      userTasks: [...this.state.userTasks, task]
    })
    )
  }

  removeTask = (taskuser) => {
    fetch(`http://localhost:3000/tasksusers/${taskuser.id}`, {method: 'DELETE'})
    this.setState({
      userTasks: this.state.userTasks.filter((userTask)=>{ return userTask.id !== taskuser.task_id})
    })
  }

  getTasks = () => {
    axios.get("http://localhost:3000/tasks")
    .then(resp => this.setState({
      tasks: resp.data.tasks
    }))
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div className="header">
            <h1 className="headerMain">
                <Link to="/" className="headerMain">Simple To-do App</Link>
            </h1>
            <h3>
              <div className="headerLink">
                {this.renderRegisterRoute()}
                {this.renderLoginRoute()}
                {this.renderMyTaskRoute()}
                {this.renderCreateTaskRoute()}
              </div>
            </h3>
          </div>
          <Switch>
            <Route exact path={"/"} render={props => (
              <Home />
            )} />
            <Route path="/register" render={props => (
              <Register {... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
            )} />
            <Route path="/login" render={props => (
              <Login {... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
            )} />
            <Route exact path={"/dash"} render={props => (
              <Dash {... props} loggedInStatus={this.state.loggedInStatus} tasks={this.state.tasks} favoriteTask={this.favoriteTask} fetchTasks={this.fetchTasks} />
            )} />
            <Route path="/user" render={props => (
              <User {... props} user={this.state.user} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
            )} />
            <Route exact path={"/mytasks"} render={props => (
              <MyTasks {... props} loggedInStatus={this.state.loggedInStatus} user={this.state.user} userTasks={this.state.userTasks} checkLogin={this.checkLoginStatus} removeTask={this.removeTask} />
            )} />
            <Route exact path={"/create"} render={props => (
              <CreateTask {... props} loggedInStatus={this.state.loggedInStatus} tasks={this.state.tasks} newTask={this.renderNewTask} />
            )} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
  }
}