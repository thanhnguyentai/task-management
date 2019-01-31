import {getProjects, addProject, deleteProject} from '../service/projectService';

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

export const addProjectAction = (name, description) => (dispatch, getState) => {
    addProject(name, description).then(response => {
        dispatch({
            type: PROJECT_ACTIONS.ADD_PROJECT,
            project: response
        });
    });
}

export const removeProjectAction = (id) => (dispatch, getState) => {
    deleteProject(id).then(response => {
        dispatch({
            type: PROJECT_ACTIONS.REMOVE_PROJECT,
            id: id
        });
    });
}

export const fetchProjectAction = () => (dispatch, getState) => {
    getProjects().then(response => {
        dispatch(fetchProjectSuccess(response));
    });
};