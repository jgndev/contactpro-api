import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {TokenPayload} from './interfaces/tokenPayload';
import authRouter from './routes/authRouter';
import healthRouter from './routes/healthRouter';
import './passport/passport.config';

dotenv.config();

const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

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

// === OAuth ===
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: '/auth/google/callback',
//         },
//         (accessToken: any, refreshToken: any, profile: any, done: any) => {
//
//         }
//     )
// );


// === Routes ===
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.use('/auth', authRouter);
app.use('/health', healthRouter)

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;
