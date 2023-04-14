import {getToken, setToken, setUserDetails} from "../helpers/SessionHelper";
import {HideLoader, ShowLoader} from "../redux/state-slice/setting-slice";
import store from '../redux/store/store';
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helpers/FormHelper";

const baseurl = "http://127.0.0.1:5000/api/v1";


const AxiosHeader = {token: getToken()};

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
