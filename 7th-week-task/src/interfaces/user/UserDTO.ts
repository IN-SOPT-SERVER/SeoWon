export interface UserDTO{
    id: number;
    userName: string;
    age: number;
    email: string;
    password: string;
}

export interface UserUpdateDTO{
    userName?: string;
    age?: number;
    email?: string;
    password?: string;
}