import React , {useEffect}from 'react';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';
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
  useEffect(() => {
    fetchTaskAction();
  }, []);

  return (
      <div className="task-container">
        <TaskColumn type={TaskState.BACK_LOG}
          header="Back Log"
          tasks={backLogTasks}
        />
        <TaskColumn type={TaskState.SELECTED_DEVELOP}
          header="Selected for Develop"
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
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
