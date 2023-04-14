import React, {Fragment,Suspense} from 'react';
import Login from "../components/Login/Login";
import LazyLoader from "../components/MasterLayout/LazyLoader";

const LoginPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Login/>
            </Suspense>
        </Fragment>
    );
};

export default LoginPage;