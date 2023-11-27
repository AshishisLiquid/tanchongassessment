export interface User{
    _id?: string;
    name: string;
    email: string;
    contact: number;
    age: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Hit{
    hits: User[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}