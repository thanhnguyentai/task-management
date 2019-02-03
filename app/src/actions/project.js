import {getProjects, addProject, deleteProject, updateProject, getProjectDetail} from '../service/projectService';
import {getProjectDetailReducer} from '../reducers';
import PROJECT_ACTIONS from './projectAction';

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

export const updateProjectAction = (id, name, description) => (dispatch, getState) => {
    updateProject(id, name, description).then(() => {
        dispatch({
            type: PROJECT_ACTIONS.UPDATE_PROJECT,
            project: {
                id, name, description
            }
        });
    })
};

export const fetchProjectAction = () => (dispatch, getState) => {
    getProjects().then(response => {
        dispatch(fetchProjectSuccess(response));
    });
};

export const getProjectDetailAction = (projectId) => (dispatch, getState) => {
    const projects = getProjectDetailReducer(getState());
    if(projects && projects.length > 0) {
        dispatch({
            type: PROJECT_ACTIONS.DETAIL_PROJECT,
            project: projects.find(project => project.id === projectId)
        });
    } else {
        getProjectDetail(projectId).then(response => {
            dispatch({
                type: PROJECT_ACTIONS.DETAIL_PROJECT,
                project: response
            });
        })
    }
}

export const resetSelectedProjectAction = () => {
    return {
        type: PROJECT_ACTIONS.RESET_SELECTED_PROJECT
    }
}