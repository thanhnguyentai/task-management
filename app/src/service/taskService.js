import { v4 } from 'uuid';
import TaskState from '../constant/task_state';

const fakeDatabase = {
    tasks: [{
            id: v4(),
            title: 'Task 1',
            description: 'Description',
            state: TaskState.BACK_LOG.key
        },{
            id: v4(),
            title: 'Task 2',
            description: 'Description',
            state: TaskState.BACK_LOG.key
        },{
            id: v4(),
            title: 'Task 3',
            description: 'Description',
            state: TaskState.BACK_LOG.key
        },{
            id: v4(),
            title: 'Task 4',
            description: 'Description',
            state: TaskState.SELECTED_DEVELOP.key
        },{
            id: v4(),
            title: 'Task 5',
            description: 'Description',
            state: TaskState.INPROGRESS.key
        },
    ]
};

export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchTask = () => {
    return delay(500).then(() => {
        return fakeDatabase.tasks;
    });
}