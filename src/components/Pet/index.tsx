import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updatePet, deletePet } from "../../state/pet/petSlice";
import { Link } from "react-router-dom";
import PetForm from "../PetForm";
import { Modal } from "@mui/material";
import { getPetsByUserId } from "../../state/pets/petsSlice";

// Pet data for specific pet that user owns
export default function Pet() {
    const dispatch = useAppDispatch();
    const pet = useAppSelector((state) => state.pet);
    const user = useAppSelector((state) => state.user);
    const pets = useAppSelector((state) => state.pets);
    const [editPet, setEditPet] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeletePet = async () => {
        if (pet.data?.id)
            dispatch(deletePet(pet.data.id))
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const elements = new FormData(event.currentTarget);
        const retro = elements.get('retro');
        await dispatch(updatePet(Object.assign({}, pet.data, { garden: true, retro })))

        if (user.data?.id) {
            await dispatch(getPetsByUserId(user.data.id));
            setModalOpen(false);
        } else {
            if (user.errorMessage)
                console.log(user.errorMessage)
            if (pets.errorMessage)
                console.log(pets.errorMessage)
        }
    }

    const PetBody = () => {
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
                                    <div onClick={() => setModalOpen(true)}>Release Pet Into Garden</div>
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

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <form onSubmit={handleSubmit}>
                    <label>
                        Retrospective:
                        <textarea name='retro' id='retro'/>
                    </label>
                    <button type='submit'>Submit</button>
                    <button onClick={() => setModalOpen(false)}>Cancel</button>
                </form>
            </Modal>

            <PetBody />
        </>
    )
}