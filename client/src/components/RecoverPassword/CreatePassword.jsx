import React, {useRef} from 'react';
import {getEmail, getOTP} from "../../helpers/SessionHelper";
import {useNavigate} from "react-router";
import {ErrorToast, IsEmpty} from "../../helpers/FormHelper";
import {recoverResetPassRequest} from "../../ApiRequest/ApiRequest";

const CreatePassword = () => {
    let passwordRef,confirmPassRef = useRef();
    let navigate = useNavigate();
    const resetPassword = () => {
        let email = getEmail();
        let otp = getOTP();
        let password = passwordRef.value;
        let confirmPassword = confirmPassRef.value;
        if(IsEmpty(password)){
            ErrorToast('Password is required');
        }
        else if(IsEmpty(confirmPassword)){
            ErrorToast('Confirm password is required');
        }
        else if(password !== confirmPassword){
            ErrorToast('Password and Confirm Password should be same');
        }
        else{
            recoverResetPassRequest(email,password,otp).then(result => {
                if(result===true){
                    navigate('/login');
                }
            });
        }
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-90 p-4">
                        <div className="card-body">
                            <h4>SET NEW PASSWORD</h4>
                            <br/>
                            <label>Your email address</label>
                            <input readOnly={true} value={getEmail()} type="text" placeholder="User Email" className="form-control animated fadeInUp"/>
                            <br/>
                            <label>New Password</label>
                            <input ref={(input)=>passwordRef=input} type="password" placeholder="New Password" className="form-control animated fadeInUp"/>
                            <br/>
                            <label>Confirm Password</label>
                            <input ref={(input)=>confirmPassRef=input} type="password" placeholder="Confirm Password" className="form-control animated fadeInUp"/>
                            <br/>
                            <button className="btn btn-primary float-end w-100 animated fadeInUp">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePassword;