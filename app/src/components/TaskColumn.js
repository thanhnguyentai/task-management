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

function TaskColumn({type, header, tasks, connectDropTarget, isOver}) {
    return connectDropTarget(
        <div className="task-column">
            <div className="task-column-header">{tasks && tasks.length > 0 ? <b>{tasks.length} - </b> : null}{header}</div>
            <div className="task-column-items">
                {tasks && tasks.map(task => {
                    return <TaskItem key={task.id}  
                        title={task.title} 
                        description={task.description}
                        state={task.state}
                    />
                })}
            </div>
        </div>
    );
}

export default DropTarget(ITEM_TYPES.TASK, columnTarget, collect)(TaskColumn);
