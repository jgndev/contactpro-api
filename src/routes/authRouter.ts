/// <reference types="express" />
/// <reference path="../custom.d.ts" />

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import {PrismaClient} from '@prisma/client'
import {RegisterDto} from '../dtos/registerDto';
import {LoginDto} from '../dtos/loginDto';

const router = express.Router();
const prisma = new PrismaClient()

router.post('/register', async (req, res) => {
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

        res.status(200).json({message: 'User registered', user: user});

    } catch (error) {
        res.status(500).json({message: 'Internal server error, user not created'});
    }
});

router.post('/login', async (req, res) => {
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

function isAdmin(req: any, res: any, next: any) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({message: 'Forbidden'});
    }
}

export default router;