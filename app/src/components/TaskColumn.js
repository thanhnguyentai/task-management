import React from 'react';
import TaskItem from './TaskItem';
import {ITEM_TYPES} from './TaskItem';
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux';
import {changeStateAction} from '../actions/task';

const columnTarget = {
    drop(props, monitor) {
        if(props.type !== monitor.getItem().state) {
            props.changeStateAction(monitor.getItem().id, props.type);
        }
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
            <div className={isOver ? "drag-over task-column-items" : "task-column-items"}>
                {tasks && tasks.map(task => {
                    return <TaskItem key={task.id}  
                        id={task.id}
                        title={task.title} 
                        description={task.description}
                        state={task.state}
                    />
                })}
            </div>
        </div>
    );
}

export default connect(null,{
    changeStateAction
})(DropTarget(ITEM_TYPES.TASK, columnTarget, collect)(TaskColumn));
