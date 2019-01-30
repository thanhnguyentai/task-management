import {combineReducers} from 'redux';
import tasks, {getTasksByState} from './tasks';
import projects from './projects';

export default combineReducers({
    tasks,
    projects
});

export const getTasks = function(state, taskState) {
    return getTasksByState(state.tasks, taskState);
}

export const getProjects = function(state) {
    return state.projects;
}