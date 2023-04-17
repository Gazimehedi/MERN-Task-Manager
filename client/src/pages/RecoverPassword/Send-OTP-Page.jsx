import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import SendOtp from "../../components/RecoverPassword/SendOTP";

const SendOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <SendOtp/>
            </Suspense>
        </Fragment>
    );
};

export default SendOtpPage;