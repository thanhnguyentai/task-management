import React, {useState} from 'react';
import './TaskItem.scss';
import { DragSource } from 'react-dnd';
import {Icon} from 'semantic-ui-react';

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
    const [isExpand, setIsExpand] = useState(false);

    const toggleDescription = function() {
        setIsExpand(!isExpand);
    }

    return connectDragSource(
        <div className="task-item" style={{opacity: isDragging ? 0.5 : 1}}>
            <div onClick={toggleDescription} className="task-item__title">{title} <Icon name={isExpand ? "angle up" : "angle down"}/></div>
            {isExpand && <div className="task-item__description">{description}</div>}
            {isExpand && <div className="task-item__actions-container">
                <Icon size="small" link name='close'/>
                <Icon size="small" link name='edit'/>
            </div>}
        </div>
    );
}

export default DragSource(ITEM_TYPES.TASK, taskSource, collect)(TaskItem);
