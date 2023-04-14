import React, {Fragment} from "react";
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/Login-Page";
import RegistrationPage from "./pages/Registration-Page";

function App() {
    return(
        <Fragment>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace /> } />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/registration" element={<RegistrationPage/>} />
            </Routes>
          </BrowserRouter>
        </Fragment>
    );
}

export default App;
