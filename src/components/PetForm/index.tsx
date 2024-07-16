import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { createPet, updatePet } from "../../state/pet/petSlice";
import { getPetsByUserId } from "../../state/pets/petsSlice";
import { Pet } from "../../types";

type PetFormProps = {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    action: 'update' | 'create';
    defaultValues?: Pet;
}
export default function PetForm({defaultValues, action, setFormVisible}: PetFormProps) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const pets = useAppSelector((state) => state.pets);
    const [formData, setFormData] = useState<Partial<Pet>>(defaultValues || {});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (action === 'update') {
            await dispatch(updatePet(Object.assign({}, defaultValues, formData)));
        } else if (action === 'create') {
            if (user.data) {
                await dispatch(createPet({userId: user.data?.id, pet: Object.assign({name: '', title: '', description: ''}, formData)}));
            } else {
                console.log('Error: No user; cannot create pet');
            }
        }
        

        if (user.data?.id) {
            await dispatch(getPetsByUserId(user.data.id));
            setFormVisible(false);
        } else {
            if (user.errorMessage)
                console.log(user.errorMessage)
            if (pets.errorMessage)
                console.log(pets.errorMessage)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name: <input name="name" value={formData?.name} onChange={handleChange}/></label>
            <br/>
            <label>Title: <input name="title" value={formData?.title} onChange={handleChange}/></label>
            <br/>
            <label>Description: <textarea name="description" value={formData?.description} onChange={handleChange}/></label>
            <br/>
            <button type='submit'>Submit</button>
            <button onClick={() => setFormVisible(false)}>Cancel</button>
        </form>
    )
}