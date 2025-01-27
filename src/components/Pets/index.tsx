import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPetsByUserId, petsError } from "../../state/pets/petsSlice";
import { Link } from "react-router-dom";
import PetForm from "../PetForm";
import './index.css';

type FilterType = {
  garden: 'Active' | 'Garden' | 'Both',
  search: string,
  happiness_min: number,
  happiness_max: number,
}

// List of pets belonging to logged in user
export default function Pets() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user)
  const pets = useAppSelector((state) => state.pets)
  const [filters, setFilters] = useState<FilterType>({ garden: 'Both', search: '', happiness_min: 0, happiness_max: 10 });
  const [createPet, setCreatePet] = useState(false);

  const filteredPets = useMemo(() => pets.data?.filter((pet) => {
    // Check to see if pet fails any filters
    for (const filter in filters) {
      switch (filter) {
        case 'garden':
          // return false if pet.garden does not match filter
          if ((filters.garden === 'Active' && pet.garden) || (filters.garden === 'Garden' && !pet.garden)) {
            return false;
          }
          break;
        case 'search':
          // return false if search term is not found in pet name, title, or description
          if (filters.search.length > 0 && !(
            pet.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
            pet.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            pet.description?.toLowerCase().includes(filters.search.toLowerCase())
          )) {
            return false;
          }
          break;
        case 'happiness_min':
          // return false if happiness points is less than min
          if (pet.hp < filters.happiness_min) {
            return false;
          }
          break;
        case 'happiness_max':
          // return false if happiness points is more than max
          if (pet.hp > filters.happiness_max) {
            return false;
          }
      }
    }

    return true;
  }), [pets.data, filters]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFilters((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  useEffect(() => {
    if (user.data) {
      dispatch(getPetsByUserId(user.data.id))
    } else {
      dispatch(petsError('Error: No user found'))
    }
  }, [user.data])

  switch (pets.status) {
    case 'loading': // Getting list of pets from db
      return <p>Loading pets...</p>
    case 'finished': // Succesfully retrieved list of pets from db
      if (pets.data) {
        return (
          <div>
            {pets.data.length ?
              <>
                { /* Filters */}
                <form>
                  <label>
                    <input name='garden' id='active' type='radio' value='Active' checked={filters.garden === 'Active'} onChange={handleChange} />
                    Active
                  </label>
                  <label>
                    <input name='garden' id='garden' type='radio' value='Garden' checked={filters.garden === 'Garden'} onChange={handleChange} />
                    Garden
                  </label>
                  <label>
                    <input name='garden' id='both' type='radio' value='Both' checked={filters.garden === 'Both'} onChange={handleChange} />
                    Both
                  </label>
                  <br/>
                  <label>
                    Search:
                    <input name='search' id='search' type='search' value={filters.search} onChange={handleChange} />
                  </label>
                  <br/>
                  <label>
                    Happiness Min.:
                    <input name='happiness_min' id='happiness_min' type='number' min='0' max='10' value={filters.happiness_min} onChange={handleChange} />
                  </label>
                  <label>
                    Happiness Max.:
                    <input name='happiness_max' id='happiness_max' type='number' min='0' max='10' value={filters.happiness_max} onChange={handleChange} />
                  </label>
                </form>

                { /* Pets */}
                <div id='pets-list'>
                  {filteredPets?.map((pet, index) =>
                    <Link to={`/pets/${pet.id}`} key={index}>
                      <div className="pet-card">
                        <p>Name: {pet.name}</p>
                        <p>Title: {pet.title}</p>
                        <p>Description: {pet.description}</p>
                        <p>Happiness: {pet.hp}/10</p>
                        {pet.garden ? 
                          <p>Garden</p>
                        : 
                          <p>Active</p>
                        }
                      </div>
                    </Link>

                  )}
                </div>
              </>
              :
              <p>No pets found.</p>
            }

            { /* Create Pets */}
            <button onClick={() => setCreatePet(true)}>Create new pet</button>

            {createPet &&
              <PetForm
                setFormVisible={setCreatePet}
                action='create'
              />
            }
          </div>
        )
      } else {
        console.log(pets.errorMessage);
        return <p>No pets found.</p>
      }
    case 'error': // Error retrieving list of pets
      console.log(pets.errorMessage);
      return <p>No pets found.</p>
  }
}