import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPet, fetchPets } from '../../fetchers';
import GenericState from '../genericState';
import { AppDispatch } from '../store';
import { Pet, ResourceList } from '../../types';

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

const petSlice = createSlice({
    name: "user",
    initialState: {status: 'loading'} as GenericState<ResourceList<Pet>>,
    reducers: {
        setFocusId: (state, action: PayloadAction<number | undefined>) => {
            if (state.data)
                state.data.focusId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPetsByUserId.pending, (state: GenericState<ResourceList<Pet>>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(getPetsByUserId.fulfilled, (state: GenericState<ResourceList<Pet>>, action: PayloadAction<Pet[]>) => {
            state.data = {data: action.payload, focusId: state.data?.focusId || undefined};
            state.status = 'finished';
        }).addCase(getPetsByUserId.rejected, (state: GenericState<ResourceList<Pet>>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot find user';
        }).addCase(updatePet.pending, (state: GenericState<ResourceList<Pet>>) => {
            state.status = 'loading';
            state.errorMessage = undefined;
        }).addCase(updatePet.fulfilled, (state: GenericState<ResourceList<Pet>>) => {
            state.status = 'finished';
        }).addCase(updatePet.rejected, (state: GenericState<ResourceList<Pet>>) => {
            state.status = 'error';
            state.errorMessage = 'Error: Cannot edit pet';
        })
    }
});

export const { setFocusId } = petSlice.actions;

export default petSlice.reducer;