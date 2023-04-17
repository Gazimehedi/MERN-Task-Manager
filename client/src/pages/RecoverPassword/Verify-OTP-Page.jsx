import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import VerifyOtp from "../../components/RecoverPassword/VerifyOTP";

const VerifyOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <VerifyOtp/>
            </Suspense>
        </Fragment>
    );
};

export default VerifyOtpPage;