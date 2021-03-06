import React , {useEffect, useState}from 'react';
import {Link} from 'react-router-dom';
import './Tasks.scss';
import TaskColumn from '../components/TaskColumn';
import {connect} from 'react-redux';
import TaskState from '../constant/task_state';
import {fetchTasksAction, addTaskAction, updateTaskAction, removeTaskAction} from '../actions/task';
import {getProjectDetailAction} from '../actions/project';
import {getTasksReducer, getProjectDetailReducer, getTaskUpToDateReducer} from '../reducers';
import {Button, Modal, Form, Confirm} from 'semantic-ui-react';

const mapStateToProps = (state, ownProps) => {
  return {
    backLogTasks: getTasksReducer(state, TaskState.BACK_LOG.key),
    selectedTasks: getTasksReducer(state, TaskState.SELECTED_DEVELOP.key),
    inprogressTasks: getTasksReducer(state, TaskState.INPROGRESS.key),
    completedTasks: getTasksReducer(state, TaskState.COMPLETED.key),
    taskUpToDate: getTaskUpToDateReducer(state),
    projectId: ownProps.match.params.projectId,
    projectDetail: getProjectDetailReducer(state)
  }
};

const mapDispatchToProps = {
  fetchTasksAction,
  getProjectDetailAction,
  addTaskAction,
  updateTaskAction,
  removeTaskAction
};

function Tasks({backLogTasks, selectedTasks, inprogressTasks, completedTasks, 
    taskUpToDate, projectId, projectDetail, 
    fetchTasksAction, getProjectDetailAction, 
    addTaskAction, updateTaskAction, removeTaskAction}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isEdittingTask, setIsEdittingTask] = useState(false);
  const [isShowRemoveConfirm, setIsShowRemoveConfirm] = useState(false);

  useEffect(() => {
    if(!taskUpToDate) {
      fetchTasksAction(projectId);
    }
    if(!projectDetail || !projectDetail.id) {
      getProjectDetailAction(projectId);
    }
  });

  const onTitleChange = function(event, {value}){
    setTaskTitle(value);
  }
  const onDescriptionChange = function(event, {value}){
    setTaskDescription(value);
  }

  const openModalCreateTask = function() {
    setIsCreatingTask(true);
  }
  const doCreateTask = function() {
    const title = taskTitle.trim();
    const description = taskDescription.trim();

    if(title) {
      setTaskTitle('');
      setTaskDescription('');
      addTaskAction(projectId, title, description, TaskState.BACK_LOG.key);
      setIsCreatingTask(false);
    }
  }
  const cancelCreateTask = function() {
    setIsCreatingTask(false);
  }

  const openModalEditTask = function(task){
    setSelectedTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setIsEdittingTask(true);
  }
  const doUpdateTask = function(){
    const title = taskTitle.trim();
    const description = taskDescription.trim();

    if(title) {
      setTaskTitle('');
      setTaskDescription('');
      updateTaskAction(selectedTask.id, title, description, selectedTask.state);
      setIsEdittingTask(false);
    }
  }
  const cancelEditTask = function() {
    setIsEdittingTask(false);
  }

  const showConfirmBeforeRemove = function(task) {
    setSelectedTask(task);
    setIsShowRemoveConfirm(true);
  }
  const cancelRemoveTask = function() {
    setIsShowRemoveConfirm(false);
  }
  const doRemoveTask = function() {
    removeTaskAction(selectedTask.id);
    setIsShowRemoveConfirm(false);
  }

  return (
      <div className="task-wrapper">
        <div className="task-header">
          <h3>
            <Link to="/projects">Projects</Link> / {projectDetail && projectDetail.name ? projectDetail.name : ""}
          </h3>
          <Button onClick={openModalCreateTask} size="small" compact={true}>Create Task</Button>
        </div>
        <div className="task-container">
          <TaskColumn onEdit={openModalEditTask} onRemove={showConfirmBeforeRemove}
            type={TaskState.BACK_LOG.key}
            header={TaskState.BACK_LOG.display}
            tasks={backLogTasks}
          />
          <TaskColumn onEdit={openModalEditTask} onRemove={showConfirmBeforeRemove}
            type={TaskState.SELECTED_DEVELOP.key}
            header={TaskState.SELECTED_DEVELOP.display}
            tasks={selectedTasks}
          />
          <TaskColumn onEdit={openModalEditTask} onRemove={showConfirmBeforeRemove}
            type={TaskState.INPROGRESS.key}
            header={TaskState.INPROGRESS.display}
            tasks={inprogressTasks}
          />
          <TaskColumn onEdit={openModalEditTask} onRemove={showConfirmBeforeRemove}
            type={TaskState.COMPLETED.key}
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
                      <Form.Input onChange={onTitleChange} placeholder="Name" value={taskTitle}/>
                  </Form.Field>
                  <Form.Field>
                      <Form.TextArea onChange={onDescriptionChange} placeholder="Description" value={taskDescription}/>
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
                      <Form.Input onChange={onTitleChange} placeholder="Name" value={taskTitle}/>
                  </Form.Field>
                  <Form.Field>
                      <Form.TextArea onChange={onDescriptionChange} placeholder="Description" value={taskDescription}/>
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
