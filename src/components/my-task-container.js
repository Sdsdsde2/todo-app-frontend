import React from 'react';
import MyTaskCard from './my-task-cards'

const MyTaskContainer = (props) => {
  return(
    <div id="task-collection">
        {props.tasks.map(task => {
            return <MyTaskCard task={task} key={task.id} />
        })}
    </div>
  );
}

export default MyTaskContainer;