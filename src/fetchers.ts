import { PetResponse, PetsResponse, TaskResponse, TasksResponse, UserResponse } from "./types";
const DEFAULT_OPTIONS = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

type OptionType = {
    method?: string;
    headers?: { 'Content-Type': string }
    body?: string;
}

export const fetchUser = (url: string, options: OptionType = {}) => 
    fetch(url, Object.assign({}, DEFAULT_OPTIONS, options)).then<UserResponse>((r) => r.json());

export const fetchPet = (url: string, options: OptionType ={}) => 
    fetch(url, Object.assign({}, DEFAULT_OPTIONS, options)).then<PetResponse>((r) => r.json());

export const fetchTask = (url: string, options: OptionType ={}) => 
    fetch(url, Object.assign({}, DEFAULT_OPTIONS, options)).then<TaskResponse>((r) => r.json());

export const fetchPets = (url: string, options: OptionType ={}) => 
    fetch(url, Object.assign({}, DEFAULT_OPTIONS, options)).then<PetsResponse>((r) => r.json());

export const fetchTasks = (url: string, options: OptionType ={}) => 
    fetch(url, Object.assign({}, DEFAULT_OPTIONS, options)).then<TasksResponse>((r) => r.json());