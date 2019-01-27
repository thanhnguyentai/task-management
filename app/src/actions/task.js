import {fetchTask} from '../service/api';

export const TASK_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS'
};

const fetchTaskSuccess = function(tasks) {
    return {
        type: TASK_ACTIONS.FETCH_TASKS_SUCCESS,
        response: tasks
    }
}

export const fetchTaskAction = () => (dispatch, getState) => {
    fetchTask().then(response => {
        dispatch(fetchTaskSuccess(response));
    });
};