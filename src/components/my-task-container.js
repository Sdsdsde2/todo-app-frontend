import React from 'react';
import MyTaskCard from './my-task-cards'
import { withRouter } from "react-router-dom";

const MyTaskContainer = (props) => {

  function findmyTask(task) {
    fetch(`http://localhost:3000/tasksusers`)
    .then(resp => resp.json())
    .then(data => data.forEach((taskuser) => {
      if(props.user.id === taskuser.user_id && task.id === taskuser.task_id)
        props.removeTask(taskuser)
      })
    )
  }

  return(
    <div id="task-collection">
        {props.userTasks.map(task => {
            return <MyTaskCard task={task} key={task.id} findmyTask={findmyTask} />
        })}
    </div>
  );
}

export default withRouter(MyTaskContainer);