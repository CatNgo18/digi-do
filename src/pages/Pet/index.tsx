import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../state/hooks";
import { getPet } from "../../state/pet/petSlice";
import { useEffect } from "react";
import PetInfo from '../../components/Pet';

// Displaying specific pet, its tasks, and pet actions
export default function Pet() {
    const { petId } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (petId)
            dispatch(getPet(petId))
    }, [petId]);

    return <PetInfo />
    
}