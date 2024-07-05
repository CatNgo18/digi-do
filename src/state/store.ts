import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        // TODO:
        // pets: petsReducer,
        // TODO:
        // tasks: tasksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;