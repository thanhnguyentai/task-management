import React from 'react';
import TaskItem from './TaskItem';
import {ITEM_TYPES} from './TaskItem';
import {DropTarget} from 'react-dnd';

const columnTarget = {
    drop(props, monitor) {
        return props;
    }
}

const collect = function(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

function TaskColumn({canAddItem, drop, connectDropTarget, isOver}) {
    const numberItems = 5;
    return connectDropTarget(
        <div className="task-column">
            <div className="task-column-header"><b>{numberItems}</b> Backlog</div>
            <div className="task-column-items">
                <TaskItem title="Item title" description="Description"/>
                <TaskItem title="Item title" description="Description"/>
                <TaskItem title="Item title" description="Description"/>
                {canAddItem && <button className="btn-add-item">+</button>}
            </div>
        </div>
    );
}

export default DropTarget(ITEM_TYPES.TASK, columnTarget, collect)(TaskColumn);
