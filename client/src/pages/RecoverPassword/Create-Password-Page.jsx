import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import CreatePassword from "../../components/RecoverPassword/CreatePassword";

const CreatePasswordPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <CreatePassword/>
            </Suspense>
        </Fragment>
    );
};

export default CreatePasswordPage;