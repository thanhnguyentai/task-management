import React from 'react';
import './TaskItem.scss';
import { DragSource } from 'react-dnd';

export const ITEM_TYPES = {
    TASK: 'TASK'
};

const taskSource = {
    beginDrag(props) {
        return {
            id: props.id,
            state: props.state,
            title: props.title,
            description: props.description
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function TaskItem({isDragging, connectDragSource, title, description}) {
    return connectDragSource(
        <div className="task-item" style={{opacity: isDragging ? 0.5 : 1}}>
            <div className="task-item-title">{title}</div>
            <div className="task-item-description">{description}</div>
        </div>
    );
}

export default DragSource(ITEM_TYPES.TASK, taskSource, collect)(TaskItem);
