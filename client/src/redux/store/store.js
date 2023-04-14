import {configureStore} from "@reduxjs/toolkit";
import settingReducer from "../state-slice/setting-slice";

export default configureStore({
    reducer:{settings:settingReducer}
});