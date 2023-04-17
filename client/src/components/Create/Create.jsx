import React, {useRef} from 'react';
import {useNavigate} from "react-router";
import {Container,Row} from "react-bootstrap";
import {ErrorToast, IsEmpty} from "../../helpers/FormHelper";
import {newTaskRequest} from "../../ApiRequest/ApiRequest";

const Create = () => {
    let titleRef,descriptionRef = useRef();
    const navigate = useNavigate();
    const CreateTask = () =>{
        let title = titleRef.value;
        let description = descriptionRef.value;
        if(IsEmpty(title)){
            ErrorToast('Title is required');
        }
        else if(IsEmpty(description)){
            ErrorToast('Description is required');
        }
        else{
            newTaskRequest(title, description).then(result => {
                if(result===true){
                    navigate('/all');
                }
            })
        }
    }
    return (
        <Container fluid={true} className="content-body" >
            <Row className="d-flex justify-content-center">
                <div className="col-12 col-lg-8 col-sm-12 col-md-8 p-2">
                    <div className="card">
                        <div className="card-body">
                            <h4>Create New</h4>
                            <br/>
                            <input type="text" ref={(input) => titleRef=input} placeholder="Task Name" className="form-control animated fadeInUp"/>
                            <br/>
                            <textarea type="text" ref={(input) => descriptionRef=input} placeholder="Task Description" rows={5} className="form-control animated fadeInUp"/>
                            <br/>
                            <button onClick={CreateTask} className="float-end btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Create;