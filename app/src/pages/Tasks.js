import React , {useEffect}from 'react';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';
import {connect} from 'react-redux';
import TaskState from '../constant/task_state';
import {fetchTaskAction} from '../actions/task';
import {getTasks} from '../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    backLogTasks: getTasks(state, TaskState.BACK_LOG.key),
    selectedTasks: getTasks(state, TaskState.SELECTED_DEVELOP.key),
    inprogressTasks: getTasks(state, TaskState.INPROGRESS.key),
    completedTasks: getTasks(state, TaskState.COMPLETED.key),
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
        <TaskColumn type={TaskState.BACK_LOG.key}
          header={TaskState.BACK_LOG.display}
          tasks={backLogTasks}
        />
        <TaskColumn type={TaskState.SELECTED_DEVELOP.key}
          header={TaskState.SELECTED_DEVELOP.display}
          tasks={selectedTasks}
        />
        <TaskColumn type={TaskState.INPROGRESS.key}
          header={TaskState.INPROGRESS.display}
          tasks={inprogressTasks}
        />
        <TaskColumn type={TaskState.COMPLETED.key}
          header={TaskState.COMPLETED.display}
          tasks={completedTasks}
        />
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
