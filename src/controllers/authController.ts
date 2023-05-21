/// <reference types="express" />
/// <reference path="../custom.d.ts" />

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import app from "../app";
import {PrismaClient} from '@prisma/client'
import {RegisterDto} from "../dtos/registerDto";
import {LoginDto} from "../dtos/loginDto";
import {TokenPayload} from "../interfaces/tokenPayload";

const prisma = new PrismaClient()

app.post('/register', async (req, res) => {
    const {username, email, password}: RegisterDto = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            },
        });

        res.status(200).json({message: "User registered", user: user});

    } catch (error) {
        res.status(500).json({message: "Internal server error, user not created"});
    }
});

app.post('/login', async (req, res) => {
    const {email, password}: LoginDto = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const validPassword = await bcrypt.compare(password, user.password || "");

        if (!validPassword) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET as string, {expiresIn: '1h'});

        res.json({
            message: "Logged in successfully",
            token,
            user,
        })
    } catch (error) {
        console.log(`Caught error logging in with email ${email}`);
        res.status(500).json({message: "Internal server error, user not logged in"});
    }
});

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

function isAdmin(req: any, res: any, next: any) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({message: 'Forbidden'});
    }
}
