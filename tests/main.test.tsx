import React from 'react';
import { expect, describe, afterEach, beforeEach, test } from 'vitest';
import { renderHook, screen, waitFor } from '@testing-library/react';
import Pet from '../src/pages/Pet';
import { makeServer } from "../src/mirage";
import { Server } from 'miragejs';
import { Pet as PetType } from '../src/types';
import { renderWithProviders } from './utils/testUtils';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

let server: Server;

beforeEach(() => {
    server = makeServer({ environment: 'test' });
});

afterEach(() => {
    server.shutdown();
});

describe('View List of Pets', () => {
    const setup = (initialPet: Partial<PetType> & Omit<PetType, 'userId' | 'id'>) => {
        const pet = server.create('pet', initialPet);
        const user = server.create('user', pet);

        const { unmount } = renderWithProviders(
            <MemoryRouter initialEntries={[`/pets/${pet.id}`]}>
                <Pet />
            </MemoryRouter>,
            {
                preloadedState: {
                    pet: {
                        status: 'finished',
                        data: {
                            ...initialPet,
                            id: pet.id,
                            userId: user.id,
                        },
                        errorMessage: undefined,
                    }
                }
            }
        );

        screen.debug();

        return unmount;
    }

    test('if list of pets is loading, show "Loading" ', () => {

    })

    test('if list of pets could not load, show "Error" ', () => {

    })

    test('if user has no pets, show no pets', () => {

    })

    test('if user has pets and pets loaded, show list of pets', () => {

    })
})

describe('Filter List of Pets', () => {
    describe('Filter List of Pets by Active/Garden (Archive)', () => {
        test('if "Active" filter is on, only show pets not in garden', () => {

        })

        test('if "Garden" filter is on, only show pets in garden', () => {

        })

        test('if "Both" filter is on, show pets both in and not in garden', () => {

        })
    })

    describe('Filter List of Pets by Search', () => {
        test('if "Search" has a string, only show pets that include string in name, description, or title', () => {

        })
    })

    describe('Filter List of Pets by Happiness Points Level', () => {
        test('if "Happiness Points" range is specified, only show pets whose happiness pets fall within that range', () => {

        })
    })
})

describe('Click Pet in List to View Details', () => {
    const setup = (initialPet: Partial<PetType> & Omit<PetType, 'userId' | 'id'>) => {
        const pet = server.create('pet', initialPet);
        const user = server.create('user', pet);

        const { unmount } = renderWithProviders(
            <MemoryRouter initialEntries={[`/pets/${pet.id}`]}>
                <Routes>
                    <Route path='/pets/:petId' element={<Pet />} />
                </Routes>
            </MemoryRouter>,
            {
                preloadedState: {
                    user: {
                        status: 'finished',
                        errorMessage: undefined,
                        data: {
                            id: user.id,
                            name: "Test User"
                        }
                    }
                }
            }
        );

        return unmount;
    }

    test("when pet in list is clicked, navigate to pet details page", () => {

    })

    test('if pet is loading, show "Loading"', () => {

    })

    test('if pet cannot laod, show "Error"', () => {

    })

    test('if pet is "Active", render Pet with details (name, title, description, happiness) and actions (return to pets list, edit pet, move pet to garden, delete pet)', async () => {
        const initialPet = { name: 'Test 1 Name', title: 'Test 1 Title', description: 'Test 1 Description', hp: 5, retro: '', garden: false };

        const unmount = setup(initialPet);

        // Pet is loading
        expect(screen.getByText(/Loading pet.../i)).toBeInTheDocument();

        // Wait for data to finish loading
        await waitFor(() => expect(screen.getByText(/Name: Test 1 Name/i)).toBeInTheDocument());

        // show Pet details
        expect(screen.getByText(/Title: Test 1 Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Description: Test 1 Description/i)).toBeInTheDocument();
        expect(screen.getByText(/Happiness: 5\/10/i)).toBeInTheDocument();
        expect(screen.queryByText(/Retrospective:/i)).not.toBeInTheDocument();

        // show Pet actions
        expect(screen.getByText(/Return to Pets List/i)).toBeInTheDocument();
        expect(screen.getByText(/Edit Pet/i)).toBeInTheDocument();
        expect(screen.getByText(/Release Pet Into Garden/i)).toBeInTheDocument();
        expect(screen.getByText(/Delete Pet/i)).toBeInTheDocument();

        unmount();
    })

    test('if pet is in "Garden", render Pet with details (name, title, description, happiness, retrospective) and actions (return to pets list, delete pet)', async () => {
        const initialPet = { name: 'Test 2 Name', title: 'Test 2 Title', description: 'Test 2 Description', hp: 5, retro: 'Test 2 Retro', garden: true };

        const unmount = setup(initialPet);

        // Pet is loading
        expect(screen.getByText(/Loading pet.../i)).toBeInTheDocument();

        // Wait for data to finish loading
        await waitFor(() => expect(screen.getByText(/Name: Test 2 Name/i)).toBeInTheDocument());

        // show Pet details
        expect(screen.getByText(/Title: Test 2 Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Description: Test 2 Description/i)).toBeInTheDocument();
        expect(screen.getByText(/Happiness: 5\/10/i)).toBeInTheDocument();
        expect(screen.queryByText(/Retrospective: Test 2 Retro/i)).toBeInTheDocument();

        // show Pet actions
        expect(screen.getByText(/Return to Pets List/i)).toBeInTheDocument();
        expect(screen.queryByText(/Edit Pet/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Release Pet Into Garden/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Delete Pet/i)).toBeInTheDocument();

        unmount();
    })
});

describe('Create New Pet', () => {
    test('trying to create a pet w/o a title results in an error', () => {

    })

    test('clicking "Cancel" results in no change in pet details', () => {

    })

    test('if there is a server error, show "Error"', () => {

    })

    test('after creating a pet, the pet shows up in the pet list', () => {

    })
})

describe('Edit Pet Details', () => {
    test('trying to submit an edit that deletes the title results in an error', () => {

    })

    test('if there is a server error, show "Error"', () => {

    })

    test('after editing a pet, the pet details are updated', () => {

    })
})

describe('Move Pet Into Garden (Archive)', () => {
    test('clicking "Cancel" results in no change to pet list', () => {

    })

    test('clicking "Submit" results in pet showing up in "Garden" filter and not "Active"', () => {

    })
})

describe('Delete Pet', () => {
    test('pet is no longer in pet list', () => {

    })
})