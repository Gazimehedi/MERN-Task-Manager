import React, {Fragment, useState} from 'react';
import ReactCodeInput from 'react-code-input';
import {useNavigate} from "react-router";
import {recoverVerifyOTPRequest} from "../../ApiRequest/ApiRequest";
import {getEmail} from "../../helpers/SessionHelper";

const VerifyOtp = () => {
    let [OTP,setOTP] = useState("");
    let navigate = useNavigate();
    let  defaultInputStyle= {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }
    const SubmitOtp = () => {
        if(OTP.length === 6){
            recoverVerifyOTPRequest(getEmail(),OTP).then((result)=>{
                if(result===true){
                    navigate('/create-password');
                }
            })
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>OTP VERIFICATION</h4>
                                <p>A 6 Digit verification code has been sent to your email address.</p>
                                <ReactCodeInput onChange={(value)=>setOTP(value)} inputStyle={defaultInputStyle} fields={6} />
                                <br/> <br/>
                                <button onClick={SubmitOtp} className="btn btn-primary w-100 animated fadeInUp float-end">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default VerifyOtp;