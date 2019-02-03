import {getTasks, addTask, removeTask, updateTask} from '../service/taskService';
import TASK_ACTIONS from './taskAction';
import {getATaskReducer} from '../reducers';

const fetchTasksSuccess = function(tasks) {
    return {
        type: TASK_ACTIONS.FETCH_TASKS_SUCCESS,
        response: tasks
    }
}

export const fetchTasksAction = (projectId) => (dispatch, getState) => {
    getTasks(projectId).then(response => {
        dispatch(fetchTasksSuccess(response));
    });
};

export const addTaskAction = (projectId, title, description, state) => (dispatch, getState) => {
    addTask(projectId, title, description, state).then(response => {
        dispatch({
            type: TASK_ACTIONS.ADD_TASK,
            task: response
        });
    });
}

export const updateTaskAction = (id, title, description, state) => (dispatch, getState) => {
    const taskBeforeUpdate = getATaskReducer(getState(), id);

    dispatch({
        type: TASK_ACTIONS.UPDATE_TASK,
        task: {
            id, title, description, state
        }
    });

    updateTask(id, title, description, state)
    .catch((error) => {
        console.log(error);
        dispatch({
            type: TASK_ACTIONS.UPDATE_TASK,
            task: taskBeforeUpdate
        });
    })
}

export const removeTaskAction = (id) => (dispatch, getState) => {
    const taskBeforeRemove = getATaskReducer(getState(), id);

    dispatch({
        type: TASK_ACTIONS.REMOVE_TASK,
        id: id
    });

    removeTask(id)
    .catch(error => {
        console.log(error);
        dispatch({
            type: TASK_ACTIONS.ADD_TASK,
            task: taskBeforeRemove
        });
    })
}