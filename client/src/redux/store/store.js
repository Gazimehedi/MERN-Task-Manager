import {configureStore} from "@reduxjs/toolkit";
import settingReducer from "../state-slice/setting-slice";
import summaryReducer from "../state-slice/summary-slice";
import taskReducer from "../state-slice/task-slice";
import profileReducer from "../state-slice/profile-slice";

export default configureStore({
    reducer:{settings:settingReducer,summary: summaryReducer,task:taskReducer,profile:profileReducer}
});