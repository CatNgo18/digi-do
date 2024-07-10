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

export const getPet = createAsyncThunk<Pet, number, {dispatch: AppDispatch}>(
    'pets/getPet',
    async (petId: number) => {
        const response = await fetchPet(
            `/api/pets/${petId}`
        );
        return response.pet;
    }
);

export const createPet = createAsyncThunk<Pet, {userId: number, pet: {name: string, title: string, description: string}}, {dispatch: AppDispatch}>(
    'pets/createPet',
    async (data: {userId: number, pet: {name?: string, title: string, description?: string}}) => {
        const response = await fetchPet(
            `/api/users/${data.userId}/pets`,
            {
                method: 'POST',
                body: JSON.stringify(data.pet),
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
        }).addCase(deletePet.fulfilled, (state: GenericState<Pet>) => {
            state.status = 'finished';
            state.data = undefined;
        }).addCase(deletePet.rejected, (state: GenericState<Pet>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot delete pet';
        }).addCase(getPet.pending, (state: GenericState<Pet>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(getPet.fulfilled, (state: GenericState<Pet>, action: PayloadAction<Pet>) => {
            state.status = 'finished';
            state.data = action.payload;
        }).addCase(getPet.rejected, (state: GenericState<Pet>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot get pet';
        }).addCase(createPet.pending, (state: GenericState<Pet>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(createPet.fulfilled, (state: GenericState<Pet>) => {
            state.status = 'finished';
        }).addCase(createPet.rejected, (state: GenericState<Pet>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot create pet';
        })
    }
});

export default petSlice.reducer;