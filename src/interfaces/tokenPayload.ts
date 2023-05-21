import {UserRole} from '@prisma/client'

export interface TokenPayload {
    id: number;
    role: UserRole
}