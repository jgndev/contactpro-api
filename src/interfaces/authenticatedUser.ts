import {UserRole} from "../enum/userRole";

export interface AuthenticatedUser {
    id: number;
    role: UserRole;
}