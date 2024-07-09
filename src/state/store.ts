import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import petsSlice from "./pets/petsSlice";
import petSlice from "./pet/petSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        pets: petsSlice,
        pet: petSlice,
        // TODO:
        // tasks: tasksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;