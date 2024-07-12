// https://redux.js.org/usage/writing-tests
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import petsReducer from "./pets/petsSlice";
import petReducer from "./pet/petSlice";

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    user: userReducer,
    pets: petsReducer,
    pet: petReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']