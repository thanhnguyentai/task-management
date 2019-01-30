import React, {useState} from 'react';
import './Projects.scss';
import { Button, Modal, Form } from 'semantic-ui-react';


function Projects() {
    const [isShowModal, toggleModal] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

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

    }

    return (
        <div className="project-wrapper">
            <h3>Projects</h3>
            <div className="project-list">

            </div>
            <Button onClick={doToggleModal}>New Project</Button>
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

export default Projects;
