import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPetsByUserId, setFocusId } from "../../state/pets/petsSlice";

type PetsProps = {
    userId: number;
}

export default function Pets({ userId }: PetsProps) {
    const pets = useAppSelector((state) => state.pets) // Pets of current user
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getPetsByUserId(userId))
    }, [userId])
  
    /* eslint-disable no-fallthrough */
    switch (pets.status) {
      case 'loading':
        return <p>Loading...</p>
      case 'finished':
        if (pets.data?.data)
          return (
            <div>
              {pets.data.data.map((pet, index) => 
                <div key={index} onClick={() => dispatch(setFocusId(pet.id))}>
                  <p>Name: {pet?.name}</p>
                  <p>Title: {pet?.title}</p>
                  <p>Description: {pet?.description}</p>
                </div>
              )}
              <div>Create new pet</div>
            </div>
          )
        // falls through to 'error'
      case 'error':
        console.log(pets.errorMessage);
        return <p>No pets found.</p>
    }
    /* eslint-enable no-fallthrough */
  }