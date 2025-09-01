import {User} from "./user";

export interface TestUser extends User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}