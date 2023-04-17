import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
import NotFound from "../components/NotFound/NotFound";

const Page404 = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <NotFound/>
            </Suspense>
        </Fragment>
    );
};

export default Page404;