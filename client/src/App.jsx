import React, {Fragment} from "react";
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/Login-Page";
import RegistrationPage from "./pages/Registration-Page";
import DashboardPage from "./pages/Dashboard-Page";
import {getToken} from "./helpers/SessionHelper";
import CreatePage from "./pages/Create-Page";
import NewPage from "./pages/New-Page";
import CompletedPage from "./pages/Completed-Page";
import ProgressPage from "./pages/Progress-Page";
import CanceledPage from "./pages/Canceled-Page";
import ProfilePage from "./pages/Profile-Page";
import SendOtpPage from "./pages/RecoverPassword/Send-OTP-Page";
import VerifyOtpPage from "./pages/RecoverPassword/Verify-OTP-Page";
import CreatePasswordPage from "./pages/RecoverPassword/Create-Password-Page";
import Page404 from "./pages/Page-404";
import FullscreenLoader from "./components/MasterLayout/Fullscreen-Loader";

function App() {
    if(getToken()){
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Navigate to="/" replace />}/>
                        <Route path="/" element={<DashboardPage/> } />
                        <Route path="/create" element={<CreatePage/> } />
                        <Route path="/all" element={<NewPage/> } />
                        <Route path="/progress" element={<ProgressPage/> } />
                        <Route path="/completed" element={<CompletedPage/> } />
                        <Route path="/canceled" element={<CanceledPage/> } />
                        <Route path="/profile" element={<ProfilePage/> } />

                        <Route path="*" element={<Page404/> } />
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
    }else{
        return(
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace /> } />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/registration" element={<RegistrationPage/>} />
                        {/*recover Password*/}
                        <Route path="/SendOTP" element={<SendOtpPage/>} />
                        <Route path="/verify-otp" element={<VerifyOtpPage/>} />
                        <Route path="/create-password" element={<CreatePasswordPage/>} />

                        <Route path="*" element={<Page404/> } />
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
    }
}

export default App;
