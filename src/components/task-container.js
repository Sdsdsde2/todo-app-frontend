import React from 'react';
import TaskCard from './task-card'

const TaskContainer = (props) => {
  return(
    <div id="task-collection">
        {props.tasks.map(task => {
            return <TaskCard task={task} key={task.id} />
        })}
    </div>
  );
}

export default TaskContainer;