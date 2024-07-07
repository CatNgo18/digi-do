import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPetsByUserId, setFocusId, updatePet } from "../../state/pets/petsSlice";
import { Pet as PetType } from "../../types";

export default function Pet() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const pets = useAppSelector((state) => state.pets);
    const pet: PetType | undefined = useAppSelector((state) => state.pets.data?.data.find((pet) => pet.id === state.pets.data?.focusId));
    const [editPet, setEditPet] = useState(false);
    const [formData, setFormData] = useState({
        name: pet?.name || '',
        title: pet?.title || '',
        description: pet?.description || '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dispatch(updatePet(Object.assign({}, pet, formData)));

        if (user.data?.id) {
            await dispatch(getPetsByUserId(user.data.id));
            setEditPet(false);
        } else {
            if (user.errorMessage)
                console.log(user.errorMessage)
            if (pets.errorMessage)
                console.log(pets.errorMessage)
        }
    }
    
    if (pet && editPet) {
        return (
            <form onSubmit={handleSubmit}>
                <label>Name: <input name="name" value={formData.name} onChange={handleChange}/></label>
                <label>Title: <input name="title" value={formData.title} onChange={handleChange}/></label>
                <label>Description: <textarea name="description" value={formData.description} onChange={handleChange}/></label>
                <button type='submit'>Submit</button>
                <button onClick={() => setEditPet(false)}>Cancel</button>
            </form>
        )

    } else if (pet && pets) {
        return (
            <div>
                <p>Name: {pet.name ?? ''}</p>
                <p>Title: {pet.title}</p>
                <p>Description: {pet.description ?? ''}</p>
                <p>Happiness: {pet.hp}/10</p>
                {pet.garden &&
                    <p>Retrospective: {pet.retro ?? ''}</p>
                }
                <div onClick={() => dispatch(setFocusId(undefined))}>Return to Pets List</div>
                {!pet.garden &&
                    <>
                        <div onClick={() => setEditPet(true)}>Edit Pet</div>
                        <div>Release Pet Into Garden</div>
                    </>
                }
                <div>Delete Pet</div>
            </div>
        )
    } else {
        return (
            <div><p>Cannot find pet</p></div>
        )
    }
}