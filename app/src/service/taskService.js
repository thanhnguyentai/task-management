import { v4 } from 'uuid';
import TaskState from '../constant/task_state';

export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const localStorageKey = "tasks";

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

export const getTasks = (projectId) => {
    return delay(500).then(() => {
        const allTasks = getFromStorage();
        if(allTasks) {
            return allTasks.filter(task => task.projectId === projectId);
        }

        return [];
    });
}

export const addTask = (projectId, title, description, state) => {
    return delay(500).then(() => {
        const task = {
            id: v4(),
            projectId,
            title,
            description,
            state,
            created: Date.now()
        }
    
        const allTasks = getFromStorage();
        if(!allTasks) {
            allTasks = [];
        }
        allTasks.push(task);
    
        saveToStorage(allTasks);
    });
}

export const deleteTask = (taskId) => {
    return delay(500).then(()=> {
        const allTasks = getFromStorage();
        if(allTasks) {
            let indexItem = -1;
            for(let i=0; i<allTasks.length; i++) {
                if(allTasks[i].id === taskId) {
                    indexItem = i;
                    break;
                }
            }

            if(indexItem >= 0){
                const newTasks = [...allTasks.slice(0,indexItem), ...allTasks.slice(indexItem+1)];
                saveToStorage(newTasks);
            }
        }
    });
}


export const updateTask = (taskId, title, description, state) => {
    return delay(500).then(()=> {
        const allTasks = getFromStorage();
        if(allTasks) {
            const newTasks = allTasks.map(task => {
                if(task.id === taskId) {
                    return {
                        ...task,
                        title,
                        description,
                        state
                    }
                } else {
                    return task;
                }
            });

            saveToStorage(newTasks);
        }
    });
};