import {AuthenticatedUser} from "./interfaces/authenticatedUser";

declare namespace Express {
    export interface Request {
        user?: AuthenticatedUser;
    }
}