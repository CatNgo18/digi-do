import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPetsByUserId } from "../../state/pets/petsSlice";
import { updatePet, deletePet } from "../../state/pet/petSlice";

export default function Pet() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const pets = useAppSelector((state) => state.pets);
    const pet = useAppSelector((state) => state.pet);
    const [editPet, setEditPet] = useState(false);
    const [formData, setFormData] = useState({
        name: pet.data?.name || '',
        title: pet.data?.title || '',
        description: pet.data?.description || '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dispatch(updatePet(Object.assign({}, pet.data, formData)));

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

    const handleDeletePet = async () => {
        if (pet.data?.id)
            dispatch(deletePet(pet.data.id))
    }
    
    if (pet.data && editPet) {
        return (
            <form onSubmit={handleSubmit}>
                <label>Name: <input name="name" value={formData.name} onChange={handleChange}/></label>
                <label>Title: <input name="title" value={formData.title} onChange={handleChange}/></label>
                <label>Description: <textarea name="description" value={formData.description} onChange={handleChange}/></label>
                <button type='submit'>Submit</button>
                <button onClick={() => setEditPet(false)}>Cancel</button>
            </form>
        )

    } else if (pet.data) {
        return (
            <div>
                <p>Name: {pet.data.name ?? ''}</p>
                <p>Title: {pet.data.title}</p>
                <p>Description: {pet.data.description ?? ''}</p>
                <p>Happiness: {pet.data.hp}/10</p>
                {pet.data.garden &&
                    <p>Retrospective: {pet.data.retro ?? ''}</p>
                }
                <div>Return to Pets List</div>
                {!pet.data.garden &&
                    <>
                        <div onClick={() => setEditPet(true)}>Edit Pet</div>
                        <div>Release Pet Into Garden</div>
                    </>
                }
                <div onClick={() => handleDeletePet()}>Delete Pet</div>
            </div>
        )
    } else {
        return (
            <div><p>Cannot find pet</p></div>
        )
    }
}