import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPet, fetchPets } from '../../fetchers';
import GenericState from '../genericState';
import { AppDispatch } from '../store';
import { Pet, ResourceList } from '../../types';

export const getPetsByUserId = createAsyncThunk<ResourceList<Pet>, number, {dispatch: AppDispatch}>(
    'pets/getPetsByUserId',
    async (userId: number) => {
        const response = await fetchPets(
            `/api/users/` +
            `${import.meta.env.PROD ? userId : import.meta.env.VITE_USER_ID}` +
            `/pets`
        );
        return {data: response.pets, focusId: null};
    }
);

const petSlice = createSlice({
    name: "user",
    initialState: {status: 'loading'} as GenericState<ResourceList<Pet>>,
    reducers: {
        setFocusId: (state, action: PayloadAction<number | null>) => {
            console.log('reducer')
            if (state.data)
                state.data.focusId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPetsByUserId.pending, (state: GenericState<ResourceList<Pet>>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(getPetsByUserId.fulfilled, (state: GenericState<ResourceList<Pet>>, action: PayloadAction<ResourceList<Pet>>) => {
            state.data = action.payload;
            state.status = 'finished';
        }).addCase(getPetsByUserId.rejected, (state: GenericState<ResourceList<Pet>>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot find user';
        })
    }
});

export const { setFocusId } = petSlice.actions;

export default petSlice.reducer;