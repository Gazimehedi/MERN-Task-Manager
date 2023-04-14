import React, {Fragment, useRef} from 'react';
import {Link} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../helpers/FormHelper";
import {LoginRequest} from "../../ApiRequest/ApiRequest";

const Login = () => {
    let passRef,emailRef=useRef();
    const submitLogin = () => {
        let email = emailRef.value;
        let password = passRef.value;
        if(IsEmail(email)){
            ErrorToast('Valid email required');
        }
        else if(IsEmpty(password)){
            ErrorToast('Password is required');
        }else{
            LoginRequest(email,password).then(result => {
                if(result ===true){
                    window.location.href="/";
                }
            });
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>Sign In</h4>
                                <br/>
                                <input ref={(input)=>emailRef=input} type="email" className="form-control animated fadeInUp" placeholder="User Email"/>
                                <br/>
                                <input ref={(input)=>passRef=input} type="password" className="form-control animated fadeInUp" placeholder="User Password"/>
                                <br/>
                                <button onClick={submitLogin} type="button" className="btn btn-primary w-100 animated fadeInUp float-end">Next</button>
                                <hr/>
                                <div className="float-end mt-3">
                                    <span>
                                        <Link to="/registration" className="text-center ms-3 h6 animated fadeInUp">Sign Up </Link>
                                        <span className="ms-1"> |</span>
                                        <Link to="/SendOTP" className="text-center ms-3 h6 animated fadeInUp">Forget Password</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;