import {TASK_ACTIONS} from '../actions/task';

export default function(state = [], action) {
    switch(action.type) {
        case TASK_ACTIONS.ADD_TASK:
            return state;
        case TASK_ACTIONS.REMOVE_TASK:
            return state;
        case TASK_ACTIONS.FETCH_TASKS_SUCCESS:
            return [...state, ...action.response];
        default:
            return state;
    }
}

export const getTasksByState = function(state, taskState) {
    return state.filter(task => task.state === taskState);
}