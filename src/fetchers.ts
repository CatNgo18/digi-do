// DB tables
export type User = {
    id: number;
    name: string;
};

export type Pet = {
    id: number;
    userId: number;
    name?: string;
    title: string;
    description?: string;
    hp: number;
    retro?: string;
    garden: boolean;
};

export type Task = {
    id: number;
    petId: number;
    title: string;
    description?: string;
    dueDate?: Date;
    status: TaskStatus;
};

export enum TaskStatus {
    Complete = 1,
    Incomplete = 0,
};

// API responses
export type UserResponse = {
    user: User;
};

export type PetResponse = {
    pet: Pet;
};

export type TaskResponse = {
    task: Task;
};

export type PetsResponse = {
    pets: Pet[];
};

export type TasksResponse = {
    tasks: Task[];
};

// fetch functions
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