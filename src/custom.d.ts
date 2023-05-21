import {TokenPayload} from "./interfaces/tokenPayload";

declare module 'express-serve-static-core' {
    interface Request {
        user?: TokenPayload;
    }
}