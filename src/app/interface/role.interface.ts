import { User } from "./user.interface";

export interface Role {
    id: number;
    title: string;
    users: User[];
}