import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPet } from '../../fetchers';
import GenericState from '../genericState';
import { AppDispatch } from '../store';
import { Pet } from '../../types';

export const updatePet = createAsyncThunk<Pet, Pet, {dispatch: AppDispatch}>(
    'pets/updatePet',
    async (pet: Pet) => {
        const response = await fetchPet(
            `/api/pets/${pet.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(pet),
            }
        );
        return response.pet;
    }
);

export const deletePet = createAsyncThunk<Pet, number, {dispatch: AppDispatch}>(
    'pets/deletePet',
    async (petId: number) => {
        const response = await fetchPet(
            `/api/pets/${petId}`,
            {
                method: 'DELETE',
            }
        );
        return response.pet;
    }
);

const petSlice = createSlice({
    name: "user",
    initialState: {status: 'loading'} as GenericState<Pet>,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(updatePet.pending, (state: GenericState<Pet>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(updatePet.fulfilled, (state: GenericState<Pet>, action: PayloadAction<Pet>) => {
            state.status = 'finished';
            state.data = action.payload;
        }).addCase(updatePet.rejected, (state: GenericState<Pet>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot edit pet';
        }).addCase(deletePet.pending, (state: GenericState<Pet>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(deletePet.fulfilled, (state: GenericState<Pet>, action: PayloadAction<Pet>) => {
            state.status = 'finished';
            state.data = action.payload;
        }).addCase(deletePet.rejected, (state: GenericState<Pet>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot delete pet';
        })
    }
});

export default petSlice.reducer;