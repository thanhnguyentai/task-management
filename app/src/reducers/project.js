import {PROJECT_ACTIONS} from '../actions/project';

export default function(state = {}, action) {
    switch(action.type) {
        case PROJECT_ACTIONS.DETAIL_PROJECT:
            return action.project;
        case PROJECT_ACTIONS.RESET_SELECTED_PROJECT:
            return {};
        default:
            return state;
    }
}