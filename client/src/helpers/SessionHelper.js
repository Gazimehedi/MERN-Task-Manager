class SessionHelper {
    setToken(token){
        localStorage.setItem('token',token);
    }
    getToken(){
        localStorage.getItem('token');
    }
    setUserDetails(UserDetails){
        localStorage.setItem('UserDetails', JSON.stringify(UserDetails));
    }
}
export const {setToken, getToken, setUserDetails} = new SessionHelper();