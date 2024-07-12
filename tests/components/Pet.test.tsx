import React from 'react';
import { it, expect, describe, afterEach, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import Pet from '../../src/pages/Pet';
import { makeServer } from "../../src/mirage";
import { Server } from 'miragejs';
import { Pet as PetType } from '../../src/types';
import { renderWithProviders } from '../utils/testUtils';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';

let server: Server;

beforeEach(() => {
    server = makeServer({environment: 'test'});
});

afterEach(() => {
    server.shutdown();
});

describe('View List of Pets')

describe('Filter List of Pets', () => {
    describe('Filter List of Pets by Active/Garden (Archive)')
    describe('Filter List of Pets by Search')
    describe('Filter List of Pets by Happiness Points Level')
})

describe('Click Pet in List to View Details')

describe('View Pet Details', () => {
    const setup = (initialPet: Partial<PetType> & Omit<PetType, 'userId'|'id'>) => {
        const pet = server.create('pet', initialPet);
        const user = server.create('user', pet);
        
        const {unmount} = renderWithProviders(
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
    
    it('should render Pet with details (name, title, description, happiness) and actions (return to pets list, edit pet, move pet to garden, delete pet) when Pet is active', () => {
        const initialPet = {name: 'Test 1 Name', title: 'Test 1 Title', description: 'Test 1 Description', hp: 5, retro: '', garden: false};

        const unmount = setup(initialPet);

        // show Pet details
        expect(screen.getByText(/Name: Test 1 Name/i)).toBeInTheDocument();
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

    it('should render Pet with details (name, title, description, happiness, retrospective) and actions (return to pets list, delete pet) when Pet is in garden', () => {
        const initialPet = {name: 'Test 2 Name', title: 'Test 2 Title', description: 'Test 2 Description', hp: 5, retro: 'Test 2 Retro', garden: true};

        const unmount = setup(initialPet);

        // show Pet details
        expect(screen.getByText(/Name: Test 2 Name/i)).toBeInTheDocument();
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

describe('Create New Pet')

describe('Edit Pet Details')

describe('Move Pet Into Garden (Archive)')

describe('Delete Pet')