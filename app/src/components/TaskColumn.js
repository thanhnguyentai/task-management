import React from 'react';
import TaskItem from './TaskItem';

function TaskColumn(props) {
    const numberItems = 5;
    return (
        <div className="task-column">
            <div className="task-column-header"><b>{numberItems}</b> Backlog</div>
            <div className="task-column-items">
                <TaskItem/>
                <TaskItem/>
                <TaskItem/>
                {props.canAddItem && <button className="btn-add-item">+</button>}
            </div>
        </div>
    );
}

export default TaskColumn;
