import {getProjects} from '../service/projectService';

export const PROJECT_ACTIONS = {
    ADD_PROJECT: 'ADD_PROJECT',
    REMOVE_PROJECT: 'REMOVE_PROJECT',
    FETCH_PROJECTS_SUCCESS: 'FETCH_PROJECTS_SUCCESS',
    UPDATE_STATE: 'UPDATE_STATE'
};

const fetchProjectSuccess = function(projects) {
    return {
        type: PROJECT_ACTIONS.FETCH_PROJECTS_SUCCESS,
        response: projects
    }
}

export const addProjectAction = (name, description) => {
    return {
        type: PROJECT_ACTIONS.ADD_PROJECT,
        name, description
    }
}

export const fetchProjectAction = () => (dispatch, getState) => {
    getProjects().then(response => {
        dispatch(fetchProjectSuccess(response));
    });
};