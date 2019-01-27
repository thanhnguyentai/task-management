import {TASK_ACTIONS} from '../actions/task';


export default function(state = [], action) {
    switch(action.type) {
        case TASK_ACTIONS.ADD_TASK:
            return state;
        case TASK_ACTIONS.REMOVE_TASK:
            return state;
        default:
            return state;
    }
}