import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPets } from '../../fetchers';
import GenericState from '../genericState';
import { AppDispatch } from '../store';
import { Pet } from '../../types';

export const getPetsByUserId = createAsyncThunk<Pet[], string, {dispatch: AppDispatch}>(
    'pets/getPetsByUserId',
    async (userId: string) => {
        const response = await fetchPets(
            `/api/users/` +
            `${userId}` +
            `/pets`
        );
        return response.pets;
    }
);

const petsSlice = createSlice({
    name: "user",
    initialState: {status: 'loading'} as GenericState<Pet[]>,
    reducers: {
        petsError(state: GenericState<Pet[]>, action: PayloadAction<string>) {
            state.status = 'error';
            state.errorMessage = action.payload;
        }
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

export const { petsError } = petsSlice.actions;

export default petsSlice.reducer;