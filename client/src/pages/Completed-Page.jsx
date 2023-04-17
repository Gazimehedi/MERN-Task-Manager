import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import Completed from "../components/Completed/Completed";

const CompletedPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Completed/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompletedPage;