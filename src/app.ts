import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {TokenPayload} from './interfaces/tokenPayload';
import authRouter from './routes/authRouter';
import healthRouter from './routes/healthRouter';
import passport from 'passport';

dotenv.config();

require('./strategies/google');

async function bootstrap() {
    // === Instantiate Express ===
    const app = express();
    const PORT = process.env.PORT || 5000;

    // === CORS ===
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));

    // === JSON ===
    app.use(express.json());

    // === Passport ===
    app.use(passport.initialize());
    // app.use(passport.session());

    // === JWT Middleware ==
    app.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return next(); // continue if no token

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

            if (!decodedToken) {
                return res.status(401).json({error: 'Unauthorized'})
            }

            const payload = decodedToken as TokenPayload;


            req.user = {
                id: payload.id,
                role: payload.role
            };
        } catch (error) {
            console.log(`Unauthorized access attempt`)
            return res.status(401).json({error: 'Unauthorized'});
        }
    });

    // === Routes ===
    // app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    // app.use('/api/auth', authRouter);
    // app.use('/health', healthRouter)
    // app.use('/', oAuthRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/health', healthRouter);

    // === Listen and Serve ===
    try {
        app.listen(PORT, () => console.log(`Starting server on ${PORT}`));
    } catch (error) {
        console.log(`Caught error trying to start server on ${PORT}: ${error}`);
    }
}

bootstrap().then(_ => console.log("Running..."));
