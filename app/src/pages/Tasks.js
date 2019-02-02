import React , {useEffect, useState}from 'react';
import {Link} from 'react-router-dom';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';
import {connect} from 'react-redux';
import TaskState from '../constant/task_state';
import {fetchTasksAction} from '../actions/task';
import {getProjectDetailAction} from '../actions/project';
import {getTasksReducer, getProjectDetailReducer} from '../reducers';
import {Button, Modal, Form, Confirm} from 'semantic-ui-react';

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
  fetchTasksAction,
  getProjectDetailAction
};

function Tasks({backLogTasks, selectedTasks, inprogressTasks, completedTasks, projectId, projectDetail, fetchTasksAction, getProjectDetailAction}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isEdittingTask, setIsEdittingTask] = useState(false);
  const [isShowRemoveConfirm, setIsShowRemoveConfirm] = useState(false);

  useEffect(() => {
    fetchTasksAction();
    getProjectDetailAction(projectId);
  });

  const onTitleChange = function(event, {value}){
    setTitle(value);
  }
  const onDescriptionChange = function(event, {value}){
    setDescription(value);
  }

  const openModalCreateTask = function() {
    setIsCreatingTask(true);
  }
  const doCreateTask = function() {}
  const cancelCreateTask = function() {
    setIsCreatingTask(false);
  }

  const openModalEditTask = function(){}
  const doUpdateTask = function(){}
  const cancelEditTask = function() {}

  const cancelRemoveTask = function() {}
  const doRemoveTask = function() {}

  return (
      <div className="task-wrapper">
        <div className="task-header">
          <h3>
            <Link to="/projects">Projects</Link> / {projectDetail && projectDetail.name ? projectDetail.name : ""}
          </h3>
          <Button onClick={openModalCreateTask} size="small" compact={true}>Create Task</Button>
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

        <Confirm
            open={isShowRemoveConfirm}
            content='Do you really want to delete this task?'
            onCancel={cancelRemoveTask}
            onConfirm={doRemoveTask}
        />

        <Modal size="small" open={isCreatingTask}>
          <Modal.Header>Add a task</Modal.Header>
          <Modal.Content>
              <Form>
                  <Form.Field>
                      <Form.Input onChange={onTitleChange} placeholder="Name" value={title}/>
                  </Form.Field>
                  <Form.Field>
                      <Form.TextArea onChange={onDescriptionChange} placeholder="Description" value={description}/>
                  </Form.Field>
              </Form>
          </Modal.Content>
          <Modal.Actions>
              <Button onClick={doCreateTask} color='green'>Create</Button>
              <Button onClick={cancelCreateTask} color='grey'>Cancel</Button>
          </Modal.Actions>
          </Modal>

          <Modal size="small" open={isEdittingTask}>
          <Modal.Header>Edit a task</Modal.Header>
          <Modal.Content>
              <Form>
                  <Form.Field>
                      <Form.Input onChange={onTitleChange} placeholder="Name" value={title}/>
                  </Form.Field>
                  <Form.Field>
                      <Form.TextArea onChange={onDescriptionChange} placeholder="Description" value={description}/>
                  </Form.Field>
              </Form>
          </Modal.Content>
          <Modal.Actions>
              <Button onClick={doUpdateTask} color='green'>Update</Button>
              <Button onClick={cancelEditTask} color='grey'>Cancel</Button>
          </Modal.Actions>
          </Modal>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
