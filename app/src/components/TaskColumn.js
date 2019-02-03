import React from 'react';
import TaskItem from './TaskItem';
import {ITEM_TYPES} from './TaskItem';
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux';
import {updateTaskAction} from '../actions/task';

const columnTarget = {
    drop(props, monitor) {
        const task = monitor.getItem();
        if(props.type !== task.state) {
            props.updateTaskAction(task.id, task.title, task.description, props.type);
        }
    }
}

const collect = function(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

function TaskColumn({onEdit, onRemove, header, tasks, connectDropTarget, isOver}) {
    const doEdit = function(taskId) {
        const task = tasks.find(task => task.id === taskId);
        onEdit(task);
    }

    const doRemove = function(taskId) {
        const task = tasks.find(task => task.id === taskId);
        onRemove(task);
    }

    return connectDropTarget(
        <div className="task-column">
            <div className="task-column-header">{tasks && tasks.length > 0 ? <b>{tasks.length} - </b> : null}{header}</div>
            <div className={isOver ? "drag-over task-column-items" : "task-column-items"}>
                {tasks && tasks.map(task => {
                    return <TaskItem key={task.id}
                        onEdit={doEdit}
                        onRemove={doRemove}
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
    updateTaskAction
})(DropTarget(ITEM_TYPES.TASK, columnTarget, collect)(TaskColumn));
