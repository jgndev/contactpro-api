import {UserRole} from '../enums/userRole';

export interface TokenPayload {
    id: number;
    role: UserRole;
}