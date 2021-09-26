import { Role } from "./role.interface";

export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    family_name: string;
    isBanned?: boolean;
    roles?: Role[];
}