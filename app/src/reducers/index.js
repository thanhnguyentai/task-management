import {combineReducers} from 'redux';
import tasks, {getTasksByState} from './tasks';
import projects from './projects';
import project from './project';

export default combineReducers({
    tasks,
    projects,
    project
});

export const getTasksReducer = function(state, taskState) {
    return getTasksByState(state.tasks, taskState);
}

export const getProjectsReducer = function(state) {
    return state.projects;
}

export const getProjectDetailReducer = function(state) {
    return state.project;
}