import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from './calendarSlice'
import tasksReducer from "./taskSlice" ; 
import authReducer from "./authSlice";

export const store = configureStore({
    reducer : {
        calendar : calendarReducer,
        tasks : tasksReducer,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;