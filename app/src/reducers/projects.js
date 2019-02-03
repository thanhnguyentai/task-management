import PROJECT_ACTIONS from '../actions/projectAction';

const removeProject = (state = [], action) => {
    return state.filter(project => project.id !== action.id);
}

const updateProject = (state = [], action) => {
    return state.map(project => {
        if(project.id !== action.project.id) {
            return project;
        } else {
            return {
                ...project,
                name: action.project.name,
                description: action.project.description
            }
        }
    });
}

export default function(state = [], action) {
    switch(action.type) {
        case PROJECT_ACTIONS.ADD_PROJECT:
            return [...state, action.project];
        case PROJECT_ACTIONS.FETCH_PROJECTS_SUCCESS:
            return [...action.response];
        case PROJECT_ACTIONS.REMOVE_PROJECT:
            return removeProject(state, action);
        case PROJECT_ACTIONS.UPDATE_PROJECT:
            return updateProject(state, action);
        default:
            return state;
    }
}