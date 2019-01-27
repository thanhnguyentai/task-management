import React , {useEffect}from 'react';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {connect} from 'react-redux';
import TaskState from '../constant/task_state';
import {fetchTaskAction} from '../actions/task';
import {getTasks} from '../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    backLogTasks: getTasks(state, TaskState.BACK_LOG),
    selectedTasks: getTasks(state, TaskState.SELECTED_DEVELOP),
    inprogressTasks: getTasks(state, TaskState.INPROGRESS),
    completedTasks: getTasks(state, TaskState.COMPLETED),
  }
};

const mapDispatchToProps = {
  fetchTaskAction
};

function Tasks({backLogTasks, selectedTasks, inprogressTasks, completedTasks, fetchTaskAction}) {
  console.log(backLogTasks);
  useEffect(() => {
    console.log('fetch all tasks');
    fetchTaskAction();
  }, []);

  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <div className="task-container">
        <TaskColumn type={TaskState.BACK_LOG}
          header="Back Log"
          tasks={backLogTasks}
        />
        <TaskColumn type={TaskState.SELECTED_DEVELOP}
          header="Select for Develop"
          tasks={selectedTasks}
        />
        <TaskColumn type={TaskState.INPROGRESS}
          header="Inprogress"
          tasks={inprogressTasks}
        />
        <TaskColumn type={TaskState.COMPLETED}
          header="Completed"
          tasks={completedTasks}
        />
      </div>
    </DragDropContextProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
