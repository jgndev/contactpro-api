import {TokenPayload} from "./interfaces/tokenPayload";

declare namespace Express {
    export interface Request {
        user?: TokenPayload;
    }
}