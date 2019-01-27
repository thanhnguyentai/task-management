import React from 'react';
import './TaskItem.scss';
import { DragSource } from 'react-dnd';

export const ITEM_TYPES = {
    TASK: 'TASK'
};

const taskSource = {
    beginDrag(props) {
        return {
            title: props.title,
            description: props.description
        }
    },
    endDrag(props, monitor) {
        console.log(monitor.getDropResult())
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function TaskItem({isDragging, connectDragSource, title, description, state}) {
    return connectDragSource(
        <div className="task-item" style={{opacity: isDragging ? 0.5 : 1}}>
            <div className="task-item-title">{title}</div>
            <div className="task-item-description">{description}</div>
        </div>
    );
}

export default DragSource(ITEM_TYPES.TASK, taskSource, collect)(TaskItem);
