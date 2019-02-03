import TASK_ACTIONS from '../actions/taskAction';
import PROJECT_ACTIONS from '../actions/projectAction';

const updateTask = (state = [], action) => {
    return state.map(task => {
        if(task.id !== action.task.id) {
            return task;
        } else {
            return {
                ...task,
                title: action.task.title,
                description: action.task.description,
                state: action.task.state
            };
        }
    });
}

const removeTask = (state = [], action) => {
    return state.filter(task => task.id !== action.id);
}

export default function(state = [], action) {
    switch(action.type) {
        case TASK_ACTIONS.ADD_TASK:
            return [...state, action.task];
        case TASK_ACTIONS.REMOVE_TASK:
            return removeTask(state, action);
        case TASK_ACTIONS.UPDATE_TASK:
            return updateTask(state, action);
        case TASK_ACTIONS.FETCH_TASKS_SUCCESS:
            return action.response;
        case PROJECT_ACTIONS.RESET_SELECTED_PROJECT:
            return [];
        default:
            return state;
    }
}

export const getTasksByState = function(state, taskState) {
    return state.filter(task => task.state === taskState);
}

export const getATask = function(state, taskId) {
    return state.find(task => task.id === taskId);
}