import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helpers/SessionHelper";
import {HideLoader, ShowLoader} from "../redux/state-slice/setting-slice";
import store from '../redux/store/store';
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helpers/FormHelper";
import {SetSummary} from "../redux/state-slice/summary-slice";
import {setCanceledTask, setCompletedTask, setNewTask, setProgressTask} from "../redux/state-slice/task-slice";
import {setProfileDetails} from "../redux/state-slice/profile-slice";

const baseurl = "http://127.0.0.1:5000/api/v1";


const AxiosHeader = {headers:{token: getToken()}};

export function newTaskRequest(title,description) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/createTask";
    const postBody = {title:title,description:description,status:'New'};
    return axios.post(url,postBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader());
        if(res.status===200){
            SuccessToast('New task created');
            return true;
        }else{
            ErrorToast('Something went wrong!');
            return false;
        }
    }).catch((err)=>{
        store.dispatch(HideLoader());
        ErrorToast('Something went wrong!');
        return false;
    });
}
export function LoginRequest(email,password) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/login";
    let postBody = {email,password};
    return axios.post(url,postBody).then(res=>{
        store.dispatch(HideLoader());
        if(res.status===200){
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            SuccessToast('Login success');
            return true;
        }else{
            ErrorToast('Invalid Email and Password!');
            return false;
        }
    }).catch(err=>{
       store.dispatch(HideLoader());
       ErrorToast('Something went wrong');
       return false;
    });
}
export function RegistrationRequest(email,firstName,lastName,mobile,password,photo) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/registration";
    let postBody = {email,firstName,lastName,mobile,password,photo};
    return axios.post(url,postBody).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 201){
            if(res.status==='fail'){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast('Email already exists');
                    return false;
                }else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }else{
                SuccessToast("Registration Success")
                return true;
            }
        }else{
            ErrorToast(res.data['message']);
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast(err.response.data.message);
        return false;
    });
}


// Dashboard
export function SummaryRequest() {
    store.dispatch(ShowLoader());
    let url = baseurl+"/taskStatusCount";
    return axios.get(url, AxiosHeader).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            store.dispatch(SetSummary(res.data['data']));
        }else{
            ErrorToast(res.data['message']);
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast(err.response.data.message);
        return false;
    });
}

// Task
export function TaskListByStatus(Status) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/listTaskByStatus/"+Status;
    return axios.get(url, AxiosHeader).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            if(Status==='New'){
                store.dispatch(setNewTask(res.data['data']));
            }
            else if(Status==='Completed'){
                store.dispatch(setCompletedTask(res.data['data']));
            }
            else if(Status==='Progress'){
                store.dispatch(setProgressTask(res.data['data']));
            }
            else if(Status==='Canceled'){
                store.dispatch(setCanceledTask(res.data['data']));
            }
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast(err.response.data.message);
        return false;
    });
}
export function UpdateStatusRequest(id,status) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/updateTaskStatus/"+id+"/"+status;
    return axios.post(url,{}, AxiosHeader).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            SuccessToast('Status updated');
            return true;
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast('Somthing went wrong!');
        return false;
    });
}
export function DeleteTaskRequest(id) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/deleteTask/"+id;
    return axios.post(url, {}, AxiosHeader).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            SuccessToast('Delete Successfully');
            return true;
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast('Sonthing went wrong');
        return false;
    });
}
// Profile
export function GetProfileDetails() {
    store.dispatch(ShowLoader());
    let url = baseurl+"/profileDetails";
    return axios.get(url, AxiosHeader).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            store.dispatch(setProfileDetails(res.data['data'][0]));
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast('Sonthing went wrong');
        return false;
    });
}
export function updateProfileRequest(email,firstName,lastName,mobile,password,photo) {
    store.dispatch(ShowLoader());
    let postBody = {email,firstName,lastName,mobile,password,photo};
    let userDetails = {email,firstName,lastName,mobile,photo};
    let url = baseurl+"/profileUpdate";
    return axios.post(url, postBody, AxiosHeader).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            SuccessToast('Profile updated success');
            setUserDetails(userDetails);
            return true;
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast('Sonthing went wrong');
        return false;
    });
}

// Recover password
export function recoverVerifyEmailRequest(email) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/RecoverVerifyEmail";
    let postBody = {email};
    return axios.post(url, postBody, AxiosHeader).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            if(res.data['status'] === 'fail'){
                ErrorToast('User not found');
                return false;
            }else{
                setEmail(email);
                SuccessToast('A 6 Digit verification code has been sent to your email address.');
                return true;
            }
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast('Sonthing went wrong');
        return false;
    });
}
export function recoverVerifyOTPRequest(email,otp) {
    store.dispatch(ShowLoader());
    let url = baseurl+"/RecoverVerifyOTP/"+email+"/"+otp;
    return axios.get(url).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            if(res.data['status'] === 'fail'){
                ErrorToast('Invalid OTP code!');
                return false;
            }else{
                setOTP(otp);
                SuccessToast('Code verification success');
                return true;
            }
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast('Sonthing went wrong');
        return false;
    });
}
export function recoverResetPassRequest(email,password,otp) {
    store.dispatch(ShowLoader());
    let postBody = {email,password,otp};
    let url = baseurl+"/RecoverResetPass";
    return axios.post(url,postBody).then(res=>{
        store.dispatch(HideLoader());
        if(res.status === 200){
            if(res.data['status'] === 'fail'){
                ErrorToast(res.data['message']);
                return false;
            }else{
                SuccessToast('Password updated');
                return true;
            }
        }else{
            ErrorToast('Sonthing went wrong');
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast('Sonthing went wrong');
        return false;
    });
}