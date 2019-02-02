import {getTasks, addTask, removeTask, updateTask} from '../service/taskService';

export const TASK_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    UPDATE_TASK: 'UPDATE_TASK'
};

const fetchTasksSuccess = function(tasks) {
    return {
        type: TASK_ACTIONS.FETCH_TASKS_SUCCESS,
        response: tasks
    }
}

export const fetchTasksAction = () => (dispatch, getState) => {
    getTasks().then(response => {
        dispatch(fetchTasksSuccess(response));
    });
};

export const addTaskAction = (title, description, projectId) => (dispatch, getState) => {
    addTask(projectId, title, description).then(response => {
        dispatch({
            type: TASK_ACTIONS.ADD_TASK,
            task: response
        });
    });
}

export const updateTaskAction = (id, title, description, state) => (dispatch, getState) => {
    updateTask(id, title, description, state).then(() => {
        dispatch({
            type: TASK_ACTIONS.UPDATE_TASK,
            task: {
                id, title, description, state
            }
        });
    });
}

export const removeTaskAction = (id) => (dispatch, getState) => {
    removeTask(id).then(() => {
        dispatch({
            type: TASK_ACTIONS.REMOVE_TASK,
            id: id
        });
    });
}