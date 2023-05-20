import {UserRole} from "../enum/userRole";

export interface TokenPayload {
    id: number;
    role: UserRole;
}