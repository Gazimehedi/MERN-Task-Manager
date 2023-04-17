import React, {useEffect, useRef} from 'react';
import {GetProfileDetails, updateProfileRequest} from "../../ApiRequest/ApiRequest";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile} from "../../helpers/FormHelper";

const Profile = () => {
    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView=useRef();
    useEffect(()=>{
        GetProfileDetails();
    },[]);
    const navigate = useNavigate();
    const ImagePreview = ()=>{
        let ImageView = userImgRef.files[0];
        getBase64(ImageView).then((base64Img)=>{
            userImgView.src=base64Img;
        });
    };
    const updateProfile = ()=>{
        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.src;
        if(IsEmail(email)){
            ErrorToast('Valid email address required');
        }
        else if(IsEmpty(firstName)){
            ErrorToast('First Name is required');
        }
        else if(IsEmpty(lastName)){
            ErrorToast('Last Name is required');
        }
        else if(IsMobile(mobile)){
            ErrorToast('Valid mobile number is required');
        }
        else if(IsEmpty(password)){
            ErrorToast('Password is required');
        }
        else{
            updateProfileRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                if(result===true){
                    navigate('/');
                }
            })
        }
    }
    const profileData = useSelector((state)=>state.profile.value);
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input)=>userImgView=input} src={profileData['photo']} className="icon-nav-img-lg" alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={ImagePreview} ref={(input)=>userImgRef=input} type="file" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={profileData['email']} ref={(input) => emailRef=input} type="email" className="form-control animated fadeInUp" placeholder="User Email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input key={Date.now()} defaultValue={profileData['firstName']} ref={(input) => firstNameRef=input} type="text" className="form-control animated fadeInUp" placeholder="First Name"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()} defaultValue={profileData['lastName']} ref={(input) => lastNameRef=input} type="text" className="form-control animated fadeInUp" placeholder="Last Name"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile Number</label>
                                        <input key={Date.now()} defaultValue={profileData['mobile']} ref={(input) => mobileRef=input} type="mobile" className="form-control animated fadeInUp" placeholder="Mobile Number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()} defaultValue={profileData['password']} ref={(input) => passwordRef=input} type="password" className="form-control animated fadeInUp" placeholder="Password"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={updateProfile} className="btn btn-primary w-100 float-end animated fadeInUp">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;