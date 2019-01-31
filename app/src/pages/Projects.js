import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './Projects.scss';
import { Button, Modal, Form, List, Icon, Confirm} from 'semantic-ui-react';
import {addProjectAction, removeProjectAction, fetchProjectAction} from '../actions/project';
import {getProjects} from '../reducers';

const mapStateToProps = function(state) {
    return {
        projects: getProjects(state)
    }
}

function Projects({addProject, removeProject, fetchProjects, projects}) {
    const [isShowModal, toggleModal] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [isShowRemoveConfirm, setShowConfirm] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const doToggleModal = function(){
        toggleModal(!isShowModal);
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
            doToggleModal();
            setProjectName('');
            setProjectDescription('');
            addProject(name, description);
        }
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

    return (
        <div className="project-wrapper">
            <h3>Projects</h3>
            <div className="project-list">
                { projects && 
                    <List divided relaxed>
                        {
                            projects.map(project => {
                                return (
                                    <List.Item key={project.id}>
                                        <List.Content className="project-item">
                                            <List.Header as='a'>{project.name}</List.Header>
                                            <List.Description as='a'>{project.description}</List.Description>
                                            <Icon data-project={project.id} onClick={showConfirmBeforeRemove} link name='close' className="project-item__delete" />
                                        </List.Content>
                                    </List.Item>
                                );
                            })
                        }
                    </List>
                }
            </div>
            <Button onClick={doToggleModal}>New Project</Button>

            <Confirm
                open={isShowRemoveConfirm}
                content='Do you really want to delete this project?'
                onCancel={cancelRemoveProject}
                onConfirm={doRemoveProject}
            />

            <Modal size="small" open={isShowModal}>
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
                    <Button onClick={createProject} color='green'>Yes</Button>
                    <Button onClick={doToggleModal} color='grey'>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default connect(mapStateToProps, {
    addProject: addProjectAction,
    removeProject: removeProjectAction,
    fetchProjects: fetchProjectAction
})(Projects);
