import React from 'react';
import './TaskItem.scss';

function TaskItem() {
    return (
        <div className="task-item">
            <div className="task-item-title">Item Name</div>
            <div className="task-item-description">Item Description</div>
        </div>
    );
}

export default TaskItem;
