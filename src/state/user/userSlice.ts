import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from '../../fetchers';
import GenericState from '../genericState';
import { AppDispatch } from '../store';
import { User } from '../../types';

export const getUserById = createAsyncThunk<User, number, {dispatch: AppDispatch}>(
    'user/getUserById',
    async (userId: number) => {
        const response = await fetchUser(
            `/api/users/` +
            `${import.meta.env.PROD ? userId : import.meta.env.VITE_USER_ID}`
        );
        return response.user;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {status: 'loading'} as GenericState<User>,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserById.pending, (state: GenericState<User>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(getUserById.fulfilled, (state: GenericState<User>, action: PayloadAction<User>) => {
            state.data = action.payload;
            state.status = 'finished';
        }).addCase(getUserById.rejected, (state: GenericState<User>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot find user';
        })
    }
});

export default userSlice.reducer;
  