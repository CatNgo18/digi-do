// DB tables
export type User = {
    id: string;
    name: string;
};

export type Pet = {
    id: string;
    userId: string;
    name: string;
    title: string;
    description: string;
    hp: number;
    retro: string;
    garden: boolean;
};

export type Task = {
    id: string;
    petId: string;
    title: string;
    description: string;
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