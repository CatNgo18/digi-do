import { expect, describe, afterEach, beforeEach, test } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import Pet from '../src/pages/Pet';
import { makeServer } from "../src/mirage";
import { Server } from 'miragejs';
import { Pet as PetType, User as UserType } from '../src/types';
import { renderWithProviders } from './utils/testUtils';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import GenericState from '../src/state/genericState';

let server: Server;

const TEST_USER: UserType = {
    id: '1',
    name: "Test User"
}

const TEST_PETS: Array<PetType> = [
    {
        id: '1',
        userId: '1',
        name: 'Active Pet',
        title: 'Active Pet',
        description: 'Active Pet',
        hp: 2,
        retro: '',
        garden: false,
    },
    {
        id: '2',
        userId: '1',
        name: 'Garden Pet',
        title: 'Garden Pet',
        description: 'Garden Pet',
        hp: 7,
        retro: 'Garden Pet',
        garden: true,
    }
]

beforeEach(() => {
    server = makeServer({ environment: 'test' });
    server.create('user', TEST_USER);
    server.create('pet', TEST_PETS[0]);
    server.create('pet', TEST_PETS[1]);
});

afterEach(() => {
    server.shutdown();
    cleanup();
});

describe('View List of Pets', () => {
    const renderWithUser = (user: GenericState<UserType>) => {
        const { unmount } = renderWithProviders(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </MemoryRouter>,
            {
                preloadedState: {
                    user
                }
            }
        );

        return unmount;
    }

    test('if list of pets is loading, show "Loading pets..." ', () => {
        const unmount = renderWithUser({status: 'finished', data: TEST_USER, errorMessage: undefined});

        expect(screen.getByText('Loading pets...')).toBeInTheDocument();

        unmount();
    })

    test('if list of pets could not load, show "No pets found."', async () => {
        const unmount = renderWithUser({status: 'error', data: undefined, errorMessage: undefined});

        await waitFor(() => expect(screen.getByText('No pets found.')).toBeInTheDocument());

        unmount();
    })

    test('if user has no pets, show no pets', async () => {
        const noPetsUser = {
            id: '2',
            name: 'No Pets',
        };

        server.create('user', noPetsUser);

        const unmount = renderWithUser({status: 'finished', data: noPetsUser, errorMessage: undefined});

        await waitFor(() => expect(screen.getByText('No pets found.')).toBeInTheDocument());

        unmount();
    })

    test('if user has pets and pets loaded, show list of pets', async () => {
        const unmount = renderWithUser({status: 'finished', data: TEST_USER, errorMessage: undefined});

        await waitFor(async () => {
            const links = screen.getAllByRole('link');

            // Verify hrefs of all pets
            for (let i = 0; i < links.length; i++) {
                expect(links[i]).toHaveAttribute('href', `/pets/${i + 1}`); // List of pets should be returned in id order by default
            }
        });

        unmount();
    })
})

// TODO:
describe('Filter List of Pets', () => {
    const renderPetList = async () => {
        // render pet list
        const { unmount } = renderWithProviders(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </MemoryRouter>,
            {
                preloadedState: {
                    user: {
                        status: 'finished',
                        data: TEST_USER,
                        errorMessage: undefined,
                    }
                }
            }
        );
        
        // wait for pets to load
        await waitFor(async () => {
            const links = screen.getAllByRole('link');

            expect(links.length).toBe(2);
        });

        return unmount;
    }

    const findPetLink = (testPetsIndex: number[]) => {
        const links = screen.getAllByRole('link');
        
        testPetsIndex.forEach((petIndex) => {
            const link = links.find((link) => link.getAttribute('href') === `/pets/${TEST_PETS[petIndex].id}`);

            expect(link).toBeDefined();
        });
    }

    describe('Filter List of Pets by Active/Garden (Archive)', () => {
        const applyRadioFilter = (name: string) => {
            const radioButton = screen.getByRole('radio', {name});
            fireEvent.click(radioButton);
        }

        test('if "Active" filter is on, only show pets not in garden', async () => {
            // render function
            const unmount = await renderPetList();

            // apply active filter
            applyRadioFilter('Active');

            // check to see if only TEST_PETS[0] is in list
            findPetLink([0]);

            unmount();
        })

        test('if "Garden" filter is on, only show pets in garden', async () => {
            // render function
            const unmount = await renderPetList();

            // apply garden filter
            applyRadioFilter('Garden');

            // check to see if only TEST_PETS[1] is in list
            findPetLink([1]);

            unmount();
        })

        test('if "Both" filter is on, show pets both in and not in garden', async () => {
            // render function
            const unmount = await renderPetList();

            // apply both filter
            applyRadioFilter('Both');

            // check to see if all of TEST_PETS is in list
            findPetLink(Array.from(TEST_PETS.keys()));

            unmount();
        })
    })

    describe('Filter List of Pets by Search', () => {
        test('if "Search" has a string, only show pets that include string in name, description, or title', async () => {
            // render function
            const unmount = await renderPetList();

            // fill out search filter w/ "Active"

            // check to see if only TEST_PETS[0] is in list
            
            unmount();
        })
    })

    describe('Filter List of Pets by Happiness Points Level', () => {
        test('if "Happiness Points" range is specified, only show pets whose happiness pets fall within that range', async () => {
            // render function
            const unmount = await renderPetList();

            // fill out Happiness Points min as 3

            // check to see if only TEST_PETS[1] is in list

            // fill out Happiness Points max as 6

            // check to see if there are no pets in list

            // fill out Happiness Points min as 2

            // check to see if only TEST_PETS[0] is in list

            unmount();
        })
    })
})

describe('Click Pet in List to View Details', () => {
    const renderPet = (petId: string) => {
        const { unmount } = renderWithProviders(
            <MemoryRouter initialEntries={[`/pets/${petId}`]}>
                <Routes>
                    <Route path='/pets/:petId' element={<Pet />} />
                </Routes>
            </MemoryRouter>,
            {
                preloadedState: {
                    user: {
                        status: 'finished',
                        errorMessage: undefined,
                        data: TEST_USER
                    }
                }
            }
        );

        return unmount;
    };

    test("when pet in list is clicked, navigate to pet details page", async () => {
        const { unmount } = renderWithProviders(
            <MemoryRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/pets/:petId' element={<Pet />} />
                </Routes>
            </MemoryRouter>,
            {
                preloadedState: {
                    user: {
                        status: 'finished',
                        errorMessage: undefined,
                        data: TEST_USER
                    }
                }
            }
        );


        await waitFor(async () => {
            const links = screen.getAllByRole('link');

            // Verify hrefs of all pets
            for (let i = 0; i < links.length; i++) {
                expect(links[i]).toHaveAttribute('href', `/pets/${i + 1}`); // List of pets should be returned in id order by default
            }

            // Click first pet
            fireEvent.click(links[0]);

            // Verify that the navigated page corresponds to the pet that was clicked
            expect(screen.getByText(`Loading pet...`)).toBeInTheDocument();
            await waitFor(() => expect(screen.getByText(`Name: ${TEST_PETS[0].name}`)).toBeInTheDocument());
        });

        unmount();
    })

    test('if pet is loading, show "Loading pet..."', () => {
        const unmount = renderPet(TEST_PETS[0].id);

        // Pet is loading
        expect(screen.getByText(`Loading pet...`)).toBeInTheDocument();

        unmount();
    })

    test('if pet cannot laod, show "Cannot find pet."', async () => {
        const unmount = renderPet('3');

        // Wait for data to finish loading
        await waitFor(() => expect(screen.getByText(`Cannot find pet.`)).toBeInTheDocument());

        unmount();
    })

    test('if pet is "Active", render Pet with details (name, title, description, happiness) and actions (return to pets list, edit pet, move pet to garden, delete pet)', async () => {
        const unmount = renderPet(TEST_PETS[0].id);

        // Wait for data to finish loading
        await waitFor(() => expect(screen.getByText(`Name: ${TEST_PETS[0].name}`)).toBeInTheDocument());

        // show Pet details
        expect(screen.getByText(`Title: ${TEST_PETS[0].title}`)).toBeInTheDocument();
        expect(screen.getByText(`Description: ${TEST_PETS[0].description}`)).toBeInTheDocument();
        expect(screen.getByText(`Happiness: ${TEST_PETS[0].hp}\/10`)).toBeInTheDocument();
        expect(screen.queryByText(`Retrospective:`)).not.toBeInTheDocument();

        // show Pet actions
        expect(screen.getByText(`Return to Pets List`)).toBeInTheDocument();
        expect(screen.getByText(`Edit Pet`)).toBeInTheDocument();
        expect(screen.getByText(`Release Pet Into Garden`)).toBeInTheDocument();
        expect(screen.getByText(`Delete Pet`)).toBeInTheDocument();

        unmount();
    })

    test('if pet is in "Garden", render Pet with details (name, title, description, happiness, retrospective) and actions (return to pets list, delete pet)', async () => {
        const unmount = renderPet(TEST_PETS[1].id);

        // Wait for data to finish loading
        await waitFor(() => expect(screen.getByText(`Name: ${TEST_PETS[1].name}`)).toBeInTheDocument());

        // show Pet details
        expect(screen.getByText(`Title: ${TEST_PETS[1].title}`)).toBeInTheDocument();
        expect(screen.getByText(`Description: ${TEST_PETS[1].description}`)).toBeInTheDocument();
        expect(screen.getByText(`Happiness: ${TEST_PETS[1].hp}\/10`)).toBeInTheDocument();
        expect(screen.getByText(`Retrospective: ${TEST_PETS[1].retro}`)).toBeInTheDocument();

        // show Pet actions
        expect(screen.getByText(`Return to Pets List`)).toBeInTheDocument();
        expect(screen.queryByText(`Edit Pet`)).not.toBeInTheDocument();
        expect(screen.queryByText(`Release Pet Into Garden`)).not.toBeInTheDocument();
        expect(screen.getByText(`Delete Pet`)).toBeInTheDocument();

        unmount();
    })
});

// TODO:
describe('Create New Pet', () => {
    // render function:

    // render pet list

    // click on "create a pet"

    // fill out info

    test('trying to create a pet w/o a title results in an error', () => {
        // render function

        // delete title text

        // click submit

        // look for error
    })

    test('clicking "Cancel" results in no change in pet details', () => {
        // render function

        // click cancel

        // ensure pet list is the same as before
    })

    test('if there is a server error, show "Error"', () => {
        // render function

        // click submit

        // mock server error

        // look for error
    })

    test('after creating a pet, the pet shows up in the pet list', () => {
        // render function

        // click submit

        // wait for pets to load

        // look for pet in list
    })
})

// TODO:
describe('Edit Pet Details', () => {
    // render function:

    // render pet details page

    // wait for pet to load

    // click "edit pet" button

    test('trying to submit an edit that deletes the title results in an error', () => {
        // render function

        // empty title text box

        // click submit

        // find error
    })

    test('if there is a server error, show "Error"', () => {
        // render function

        // mock server error

        // find error
    })

    test('after editing a pet, the pet details are updated', () => {
        // render function

        // type in new name, title, and description

        // click submit

        // wait for pet to load

        // verify new name, title, and description are there
    })
})

// TODO:
describe('Move Pet Into Garden (Archive)', () => {
    // render function:

    // render pet details page

    // wait for pet to load

    // click "move pet into garden button"

    // fill out retro text box

    test('clicking "Cancel" results in no change to pet list', () => {
        // render function

        // click "cancel" button

        // check if we're still on pet details page, if pet retro is still empty, and if move pet into garden button still exists
    })

    test('if there is a server error, show "Error"', () => {
        // render function

        // mock server error

        // find error
    })

    test('clicking "Submit" results in pet showing up in "Garden" filter and not "Active"', () => {
        // render function

        // click "submit" button

        // check if we're on pet list page

        // apply garden filter

        // check if pet is in list
    })
})

// TODO:
describe('Delete Pet', () => {
    // render function:

    // render pet details page

    // wait for pet to load

    // click "delete pet" button

    test('pet is no longer in pet list', () => {
        // render function

        // make sure pet is no longer in server db
    })

    test('if there is a server error, show "Error"', () => {
        // render function

        // mock server error

        // find error
    })
})