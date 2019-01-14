import React from 'react';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';

function Tasks() {
  return (
    <div className="task-container">
      <TaskColumn canAddItem={true}/>
      <TaskColumn/>
      <TaskColumn/>
      <TaskColumn/>
    </div>
  );
}

export default Tasks;
