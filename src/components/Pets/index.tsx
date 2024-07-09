import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPetsByUserId } from "../../state/pets/petsSlice";

type FilterType = {
  garden: 'Active' | 'Garden' | 'Both',
  search: string,
  happiness: {
    min: number,
    max: number,
  },
}

export default function Pets() {
    const user = useAppSelector((state) => state.user)
    const pets = useAppSelector((state) => state.pets)
    const [filters, setFilters] = useState<FilterType>({garden: 'Both', search: '', happiness: {min: 0, max: 10}});
    const filteredPets = useAppSelector((state) => {
      const pets = state.pets.data;
      if (pets) {
        const filtered = pets.filter((pet) => {
          // Check to see if pet fails any filters
          for (let filter in filters) {
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
                  pet.name?.includes(filters.search) ||
                  pet.title.includes(filters.search) ||
                  pet.description?.includes(filters.search)
                )) {
                  return false;
                }
                break;
              case 'happiness':
                // return false if happiness points is outside of filter range
                if (pet.hp < filters.happiness.min || pet.hp > filters.happiness.max) {
                  return false;
                }
            }
          }
  
          return true;
        });

        return filtered;
      } else {
        return [];
      }
    });
    const dispatch = useAppDispatch();
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      console.log(name, value)
      setFilters((prevFormData) => ({...prevFormData, [name]: value}));
    }

    useEffect(() => {
      if (user.data)
        dispatch(getPetsByUserId(user.data.id))
    }, [user.data])
  
    switch (pets.status) {
      case 'loading':
        return <p>Loading...</p>
      case 'finished':
        if (pets.data) {
          return (
            <div>
              { /* Filters */ }
              <form>
                <label>
                  Type:
                  <label>
                    <input name='garden' id='active' type='radio' value='Active' checked={filters.garden === 'Active'} onChange={handleChange}/>
                    Active
                  </label>
                  <label>
                    <input name='garden' id='garden' type='radio' value='Garden' checked={filters.garden === 'Garden'} onChange={handleChange}/>
                    Garden
                  </label>
                  <label>
                    <input name='garden' id='both' type='radio' value='Both' checked={filters.garden === 'Both'} onChange={handleChange}/>
                    Both
                  </label>
                </label>
                <label>
                  Search:
                  <input name='search' id='search' type='search' defaultValue={filters.search} value={filters.search} onChange={handleChange}/>
                </label>
                <label>
                  Happiness Min.:
                  <input name='happiness_min' id='happiness_min' type='number' min='0' max='10' value={filters.happiness.min} onChange={handleChange}/>
                </label>
                <label>
                  Happiness Max.:
                  <input name='happiness_max' id='happiness_max' type='number' min='0' max='10' value={filters.happiness.max} onChange={handleChange}/>
                </label>
              </form>

              { /* Pets */ }
              <div>
                {filteredPets.map((pet, index) => 
                  <div key={index}>
                    <p>Name: {pet?.name}</p>
                    <p>Title: {pet?.title}</p>
                    <p>Description: {pet?.description}</p>
                    <p>Happiness: {pet.hp}</p>
                  </div>
                )}
              </div>

              {!filters.garden && <div>Create new pet</div>}
            </div>
          )
        } else {
          console.log(pets.errorMessage);
          return <p>No pets found.</p>
        }
      case 'error':
        console.log(pets.errorMessage);
        return <p>No pets found.</p>
    }
  }