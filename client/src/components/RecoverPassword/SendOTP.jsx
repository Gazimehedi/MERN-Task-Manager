import React, {useRef} from 'react';
import {useNavigate} from "react-router";
import {ErrorToast, IsEmail} from "../../helpers/FormHelper";
import {recoverVerifyEmailRequest} from "../../ApiRequest/ApiRequest";

const SendOtp = () => {
    let emailRef = useRef();
    let navigate = useNavigate();
    const VerifyEmail = () => {
        let email = emailRef.value;
        if(IsEmail(email)){
            ErrorToast('Valid Email Address Required');
        }
        else{
            recoverVerifyEmailRequest(email).then((result)=>{
                if(result===true){
                    navigate('/verify-otp');
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
                            <h4>Email Address</h4>
                            <br/>
                            <label>Your Email Address</label>
                            <input ref={(input)=>emailRef=input} type="email" placeholder="User Email" className="form-control animated fadeInUp"/>
                            <br/>
                            <button onClick={VerifyEmail} className="btn w-100 float-end btn-primary animated fadeInUp">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendOtp;