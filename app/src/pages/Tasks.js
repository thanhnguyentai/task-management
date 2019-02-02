import React , {useEffect}from 'react';
import {Link} from 'react-router-dom';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';
import {connect} from 'react-redux';
import TaskState from '../constant/task_state';
import {fetchTaskAction} from '../actions/task';
import {getProjectDetailAction} from '../actions/project';
import {getTasksReducer, getProjectDetailReducer} from '../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    backLogTasks: getTasksReducer(state, TaskState.BACK_LOG.key),
    selectedTasks: getTasksReducer(state, TaskState.SELECTED_DEVELOP.key),
    inprogressTasks: getTasksReducer(state, TaskState.INPROGRESS.key),
    completedTasks: getTasksReducer(state, TaskState.COMPLETED.key),
    projectId: ownProps.match.params.projectId,
    projectDetail: getProjectDetailReducer(state)
  }
};

const mapDispatchToProps = {
  fetchTaskAction,
  getProjectDetailAction
};

function Tasks({backLogTasks, selectedTasks, inprogressTasks, completedTasks, projectId, projectDetail, fetchTaskAction, getProjectDetailAction}) {
  useEffect(() => {
    fetchTaskAction();
    getProjectDetailAction(projectId);
  });

  return (
      <div className="task-wrapper">
        <div className="task-header">
          <h3>
            <Link to="/projects">Projects</Link> / {projectDetail && projectDetail.name ? projectDetail.name : ""}
          </h3>
        </div>
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
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
