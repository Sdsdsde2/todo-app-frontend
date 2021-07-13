import React, { Component } from 'react';

class MyTaskCard extends Component {
    render() {
        return (
            <div className="subsCard">
                <div className="cardTitle">
                    <h3>{`${this.props.task.task_title}`}</h3>
                </div>
                <h4 className="cardDesc">{`Description: ${this.props.task.task_info}`}</h4>
                <h4 className="cardPriority">{`Priority: ${this.props.task.task_priority}`}</h4>
                <button className="cardButton" onClick={() => this.props.findmyTask(this.props.task)}>Remove From Tasks</button>
            </div>
        );
    }  
}

export default MyTaskCard;