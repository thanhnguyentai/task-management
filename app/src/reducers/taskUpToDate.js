import PROJECT_ACTIONS from '../actions/projectAction';
import TASK_ACTIONS from '../actions/taskAction';

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