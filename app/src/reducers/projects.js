import {PROJECT_ACTIONS} from '../actions/project';

const removeProject = (state = [], action) => {
    return state.filter(project => project.id !== action.id);
}

export default function(state = [], action) {
    switch(action.type) {
        case PROJECT_ACTIONS.ADD_PROJECT:
            return [...state, action.project];
        case PROJECT_ACTIONS.FETCH_PROJECTS_SUCCESS:
            return [...state, ...action.response];
        case PROJECT_ACTIONS.REMOVE_PROJECT:
            return removeProject(state, action);
        default:
            return state;
    }
}