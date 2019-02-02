import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import './Projects.scss';
import { Button, Modal, Form, List, Icon, Confirm} from 'semantic-ui-react';
import {addProjectAction, removeProjectAction, 
    updateProjectAction, fetchProjectAction,
    resetSelectedProjectAction} from '../actions/project';
import {getProjectsReducer} from '../reducers';

const mapStateToProps = function(state, {match}) {
    return {
        projects: getProjectsReducer(state),
        path: match.path
    }
}

function Projects({addProject, removeProject, updateProject, fetchProjects, resetSelectedProject, projects, path}) {
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [isShowRemoveConfirm, setShowConfirm] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        resetSelectedProject();
    });

    const toggleModalCreatProject = function(){
        setIsCreatingProject(!isCreatingProject);
    }

    const toggleModalEditProject = function(){
        setIsEditingProject(!isEditingProject);
    }

    const onProjectNameChange = function(e, {value}){
        setProjectName(value);
    }

    const onProjectDescriptionChange = function(e, {value}) {
        setProjectDescription(value);
    }

    const createProject = function(){
        const name = projectName.trim();
        const description = projectDescription.trim();
        if(name && description) {
            toggleModalCreatProject();
            setProjectName('');
            setProjectDescription('');
            addProject(name, description);
        }
    }

    const cancelCreateProject = function() {
        toggleModalCreatProject();
        setProjectName('');
        setProjectDescription('');
    }

    const showConfirmBeforeRemove = function(event) {
        setSelectedProject(event.target.dataset.project);
        setShowConfirm(true);
    }

    const cancelRemoveProject = function() {
        setShowConfirm(false);
    }

    const doRemoveProject = function(){
        setShowConfirm(false);
        removeProject(selectedProject);
    }

    const editProject = function(event) {
        const id = event.target.dataset.project;
        const project = projects.find(project => project.id === id);

        setSelectedProject(id);
        setProjectName(project.name);
        setProjectDescription(project.description);
        toggleModalEditProject();
    }

    const doUpdateProject = function() {
        const name = projectName.trim();
        const description = projectDescription.trim();
        if(name && description) {
            toggleModalEditProject();
            setProjectName('');
            setProjectDescription('');
            updateProject(selectedProject, name, description);
        }
    }

    const cancelEditProject = function() {
        setProjectName('');
        setProjectDescription('');
        toggleModalEditProject();
    }

    return (
        <div className="project-wrapper">
            <h3>Projects</h3>
            <div className="project-list">
                { projects && 
                    <List divided relaxed>
                        {
                            projects.map(project => {
                                return (
                                    <List.Item key={project.id} className="project-item">
                                            <List.Content className="project-item__content">
                                                <NavLink to={path+"/"+project.id}>
                                                    <List.Header as='h4'>{project.name}</List.Header>
                                                    <List.Description as='div'>{project.description}</List.Description>
                                                </NavLink>
                                                <Icon data-project={project.id} onClick={showConfirmBeforeRemove} link name='close' className="project-item__delete" />
                                                <Icon data-project={project.id} onClick={editProject} link name='edit' className="project-item__edit" />
                                            </List.Content>
                                    </List.Item>
                                );
                            })
                        }
                    </List>
                }
            </div>
            <Button onClick={toggleModalCreatProject}>New Project</Button>

            <Confirm
                open={isShowRemoveConfirm}
                content='Do you really want to delete this project?'
                onCancel={cancelRemoveProject}
                onConfirm={doRemoveProject}
            />

            <Modal size="small" open={isCreatingProject}>
                <Modal.Header>Add a new project</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Form.Input onChange={onProjectNameChange} placeholder="Name" value={projectName}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea onChange={onProjectDescriptionChange} placeholder="Description" value={projectDescription}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={createProject} color='green'>Create</Button>
                    <Button onClick={cancelCreateProject} color='grey'>Cancel</Button>
                </Modal.Actions>
            </Modal>

            <Modal size="small" open={isEditingProject}>
                <Modal.Header>Edit a project</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Form.Input onChange={onProjectNameChange} placeholder="Name" value={projectName}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea onChange={onProjectDescriptionChange} placeholder="Description" value={projectDescription}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={doUpdateProject} color='green'>Update</Button>
                    <Button onClick={cancelEditProject} color='grey'>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default connect(mapStateToProps, {
    addProject: addProjectAction,
    removeProject: removeProjectAction,
    updateProject: updateProjectAction,
    fetchProjects: fetchProjectAction,
    resetSelectedProject: resetSelectedProjectAction
})(Projects);
