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

export type ResourceList<T> = {
    data: T[];
    focusId: number | undefined | null;
}

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