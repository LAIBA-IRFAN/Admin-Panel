import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './appSlice';
import { chatListReducer } from './chatListSlice';
import { driverReducer } from './driverSlice';
import {conductorReducer} from "./conductorSlice"
import {batchReducer} from "./batchSlice"
import {disciplineReducer} from "./disciplineSlice"
import {notificationReducer} from "./notficationSlice";
import {routeReducer} from "./routeSlice";
import { studentReducer } from './studentSlices';
import { studentChatBoxReducer } from './studentChatBoxSlice';
import { driverChatBoxReducer } from './driverChatBoxSlice';
import { conductorChatBoxReducer } from './conductorChatBoxSlice';
import { employeeChatBoxReducer } from './employeeChatBoxSlice';
import { timetableReducer } from './timetableSlice';
import {employeeReducer} from "./employeeSlice"
import { adminReducer } from './AdminSlice';
import {analyticsReducer} from './analyticsSlice'
import {categoryReducer} from "./CategorySlice"
import { busReducer } from './busSlice';
// import { driverAttendanceReducer } from './driverAttendanceSlice';
// import {batchReducer} from "./batchSlice"
// import {disciplineReducer} from "./disciplineSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        chatList:chatListReducer,
        timetable:timetableReducer,
        bus:busReducer,
        studentChatBox:studentChatBoxReducer,
        driverChatBox:driverChatBoxReducer,
        conductorChatBox:conductorChatBoxReducer,
        // driverAttendance:driverAttendanceReducer,
        employeeChatBox:employeeChatBoxReducer,
        student:studentReducer,
        driver: driverReducer,
        conductor: conductorReducer,
        batch: batchReducer,
        discipline: disciplineReducer,
        notification: notificationReducer,
        route: routeReducer,
        category: categoryReducer,
        employee: employeeReducer,
        admin : adminReducer,
        analytics: analyticsReducer,

    },
    middleware: getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
});
	
export default store; 

