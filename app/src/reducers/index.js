import {combineReducers} from 'redux';
import tasks, {getTasksByState, getATask} from './tasks';
import taskUpToDate from './taskUpToDate';
import projects from './projects';
import project from './project';
import user from './user';

export default combineReducers({
    tasks,
    projects,
    project,
    taskUpToDate,
    user
});

export const getTasksReducer = function(state, taskState) {
    return getTasksByState(state.tasks, taskState);
}

export const getTaskUpToDateReducer = function(state) {
    return state.taskUpToDate;
}

export const getProjectsReducer = function(state) {
    return state.projects;
}

export const getProjectDetailReducer = function(state) {
    return state.project;
}

export const getATaskReducer = function(state, taskId) {
    return getATask(state.tasks, taskId);
}

export const getUserData = function(state) {
    return state.user;
}