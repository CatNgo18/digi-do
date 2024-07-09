import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPets } from '../../fetchers';
import GenericState from '../genericState';
import { AppDispatch } from '../store';
import { Pet } from '../../types';

export const getPetsByUserId = createAsyncThunk<Pet[], number, {dispatch: AppDispatch}>(
    'pets/getPetsByUserId',
    async (userId: number) => {
        const response = await fetchPets(
            `/api/users/` +
            `${import.meta.env.PROD ? userId : import.meta.env.VITE_USER_ID}` +
            `/pets`
        );
        return response.pets;
    }
);

const petsSlice = createSlice({
    name: "user",
    initialState: {status: 'loading'} as GenericState<Pet[]>,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getPetsByUserId.pending, (state: GenericState<Pet[]>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(getPetsByUserId.fulfilled, (state: GenericState<Pet[]>, action: PayloadAction<Pet[]>) => {
            state.data = action.payload;
            state.status = 'finished';
        }).addCase(getPetsByUserId.rejected, (state: GenericState<Pet[]>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot find user';
        })
    }
});

export default petsSlice.reducer;