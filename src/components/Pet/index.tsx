import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPetsByUserId } from "../../state/pets/petsSlice";
import { updatePet, deletePet } from "../../state/pet/petSlice";
import { Link } from "react-router-dom";

// Pet data for specific pet that user owns
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
    console.log(formData)

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

    useEffect(() => {
        setFormData({
            name: pet.data?.name || '',
            title: pet.data?.title || '',
            description: pet.data?.description || '',
        });
    }, [pet])

    switch (pet.status) {
        case 'loading':
            return <p>Loading pet...</p>
        case 'finished':
            if (!editPet && pet.data) {
                return (
                    <div>
                        <p>Name: {pet.data.name ?? ''}</p>
                        <p>Title: {pet.data.title}</p>
                        <p>Description: {pet.data.description ?? ''}</p>
                        <p>Happiness: {pet.data.hp}/10</p>
                        {pet.data.garden &&
                            <p>Retrospective: {pet.data.retro ?? ''}</p>
                        }
                        <Link to='/'>Return to Pets List</Link>
                        {!pet.data.garden &&
                            <>
                                <div onClick={() => setEditPet(true)}>Edit Pet</div>
                                <div>Release Pet Into Garden</div>
                            </>
                        }
                        <div onClick={() => handleDeletePet()}>Delete Pet</div>
                    </div>
                )
            } else if (editPet) {
                return (
                    <form onSubmit={handleSubmit}>
                        <label>Name: <input name="name" value={formData.name} onChange={handleChange}/></label>
                        <label>Title: <input name="title" value={formData.title} onChange={handleChange}/></label>
                        <label>Description: <textarea name="description" value={formData.description} onChange={handleChange}/></label>
                        <button type='submit'>Submit</button>
                        <button onClick={() => setEditPet(false)}>Cancel</button>
                    </form>
                )
            } else {
                console.log(pet.errorMessage);
                return <p>Cannot find pet.</p>
            }
        case 'error':
            console.log(pet.errorMessage);
            return <p>Cannot find pet.</p>
    }
}