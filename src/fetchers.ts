import { PetResponse, PetsResponse, TaskResponse, TasksResponse, UserResponse } from "./types";

export const fetchUser = (url: string) => 
    fetch(url).then<UserResponse>((r) => r.json());

export const fetchPet = (url: string) => 
    fetch(url).then<PetResponse>((r) => r.json());

export const fetchTask = (url: string) => 
    fetch(url).then<TaskResponse>((r) => r.json());

export const fetchPets = (url: string) => 
    fetch(url).then<PetsResponse>((r) => r.json());

export const fetchTasks = (url: string) => 
    fetch(url).then<TasksResponse>((r) => r.json());