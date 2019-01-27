import React from 'react';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function Tasks() {
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <div className="task-container">
        <TaskColumn canAddItem={true}/>
        <TaskColumn/>
        <TaskColumn/>
        <TaskColumn/>
      </div>
    </DragDropContextProvider>
  );
}

export default Tasks;
