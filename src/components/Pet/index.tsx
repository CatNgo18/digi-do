import { useAppDispatch } from "../../state/hooks";
import { setFocusId } from "../../state/pets/petsSlice";
import { Pet as PetType } from "../../types";

type PetProps = {
    pet: PetType | null | undefined
};

export default function Pet({ pet }: PetProps) {
    const dispatch = useAppDispatch();
    
    if (pet) {
        return (
            <div>
                <p>Name: {pet.name ?? ''}</p>
                <p>Title: {pet.title}</p>
                <p>Description: {pet.description ?? ''}</p>
                <p>Happiness: {pet.hp}/10</p>
                {pet.garden &&
                    <p>Retrospective: {pet.retro ?? ''}</p>
                }
                <p onClick={() => dispatch(setFocusId(null))}>Return to Pets List</p>
            </div>
        )
    } else {
        return (
            <div><p>Cannot find pet</p></div>
        )
    }
}