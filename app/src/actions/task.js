import {getTasks} from '../service/taskService';

export const TASK_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    CHANGE_STATE: 'CHANGE_STATE'
};

const fetchTaskSuccess = function(tasks) {
    return {
        type: TASK_ACTIONS.FETCH_TASKS_SUCCESS,
        response: tasks
    }
}

export const changeStateAction = (taskId, nextState) => {
    return {
        type: TASK_ACTIONS.CHANGE_STATE,
        taskId,
        nextState
    }
}

export const fetchTaskAction = () => (dispatch, getState) => {
    getTasks().then(response => {
        dispatch(fetchTaskSuccess(response));
    });
};