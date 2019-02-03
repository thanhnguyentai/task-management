import {PROJECT_ACTIONS} from '../actions/project';
import {TASK_ACTIONS} from '../actions/task';

export default function(state = false, action) {
    switch(action.type) {
        case PROJECT_ACTIONS.RESET_SELECTED_PROJECT:
            return false;
        case TASK_ACTIONS.FETCH_TASKS_SUCCESS:
            return true;
        default:
            return state;
    }
}