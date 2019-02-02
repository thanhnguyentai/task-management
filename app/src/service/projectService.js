import { v4 } from 'uuid';
import {delay} from './taskService';

const localStorageKey = "projects";

const getFromStorage = function() {
    const data = localStorage.getItem(localStorageKey);
    if(data) {
        return JSON.parse(data);
    }

    return null;
}

const saveToStorage = function(data) {
    return localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export const getProjects = () => {
    return delay(500).then(()=> {
        const projects = getFromStorage();
        return projects || [];
    });
};

export const addProject = (name, description) => {
    return delay(500).then(()=> {
        const project = {
            id: v4(),
            name, description,
            created: Date.now()
        };
    
        let allProjects = getFromStorage();
        if(!allProjects) {
            allProjects = [];
        }
    
        allProjects.push(project);
        saveToStorage(allProjects);
        return project;
    });
};

export const deleteProject = (projectId) => {
    return delay(500).then(()=> {
        const allProjects = getFromStorage();
        if(allProjects) {
            let indexItem = -1;
            for(let i=0; i<allProjects.length; i++) {
                if(allProjects[i].id === projectId) {
                    indexItem = i;
                    break;
                }
            }

            if(indexItem >= 0){
                const newProjects = [...allProjects.slice(0,indexItem), ...allProjects.slice(indexItem+1)];
                saveToStorage(newProjects);
            }
        }
    });
};

export const updateProject = (projectId, name, description) => {
    return delay(500).then(()=> {
        const allProjects = getFromStorage();
        if(allProjects) {
            const newProjects = allProjects.map(project => {
                if(project.id === projectId) {
                    return {
                        ...project,
                        name, description
                    }
                } else {
                    return project;
                }
            });

            saveToStorage(newProjects);
        }
    });
};

export const getProjectDetail = (projectId) => {
    return delay(500).then(()=> {
        const allProjects = getFromStorage();
        if(allProjects) {
            return allProjects.find(project => project.id === projectId);
        } else {
            return null;
        }
    });
}