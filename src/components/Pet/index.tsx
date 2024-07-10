import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPetsByUserId } from "../../state/pets/petsSlice";
import { updatePet, deletePet } from "../../state/pet/petSlice";
import { Link } from "react-router-dom";
import PetForm from "../PetForm";

// Pet data for specific pet that user owns
export default function Pet() {
    const dispatch = useAppDispatch();
    const pet = useAppSelector((state) => state.pet);
    const [editPet, setEditPet] = useState(false);

    const handleDeletePet = async () => {
        if (pet.data?.id)
            dispatch(deletePet(pet.data.id))
    }

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
                    return <PetForm
                        setFormVisible={setEditPet}
                        action='update'
                        defaultValues={pet.data}
                    />
            } else {
                console.log(pet.errorMessage);
                return <p>Cannot find pet.</p>
            }
        case 'error':
            console.log(pet.errorMessage);
            return <p>Cannot find pet.</p>
    }
}