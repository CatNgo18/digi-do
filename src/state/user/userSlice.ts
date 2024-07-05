import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, fetchUser } from '../../fetchers';
import GenericState from '../genericState';
import { AppDispatch } from '../store';

export const fetchUserById = createAsyncThunk<User, number, {dispatch: AppDispatch}>(
    'user/fetchById',
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
        builder.addCase(fetchUserById.pending, (state: GenericState<User>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(fetchUserById.fulfilled, (state: GenericState<User>, action: PayloadAction<User>) => {
            state.data = action.payload;
            state.status = 'finished';
        }).addCase(fetchUserById.rejected, (state: GenericState<User>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot find user';
        })
    }
});

export default userSlice.reducer;
  