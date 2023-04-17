class SessionHelper {
    setToken(token){
        localStorage.setItem('token',token);
    }
    getToken(){
        return localStorage.getItem('token');
    }
    setUserDetails(UserDetails){
        localStorage.setItem('UserDetails', JSON.stringify(UserDetails));
    }
    getUserDetails(){
        return localStorage.getItem('UserDetails');
    }
    setEmail(email){
        localStorage.setItem('email',email);
    }
    getEmail(){
        return localStorage.getItem('email');
    }
    setOTP(otp){
        localStorage.setItem('otp', otp);
    }
    getOTP(){
        return localStorage.getItem('otp');
    }
    removeSession(){
        localStorage.clear();
        window.location.href="/login";
    }
}
export const {setToken, getToken, setUserDetails,getUserDetails,removeSession,setEmail,getEmail,setOTP,getOTP} = new SessionHelper();