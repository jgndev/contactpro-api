/// <reference types="express" />
/// <reference path="../custom.d.ts" />

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import {PrismaClient, User} from '@prisma/client'
import {RegisterDto} from '../dtos/registerDto';
import {LoginDto} from '../dtos/loginDto';
import {RegisterSuccessDto} from "../dtos/registerSuccessDto";
import {LoginSuccessDto} from "../dtos/loginSuccessDto";

const router = express.Router();
const prisma = new PrismaClient()

router.post('/register', async (req, res) => {
    const {username, email, password}: RegisterDto = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(`${username}, ${email}, ${password}`);

    try {
        // Check if the email was already used to register
        const existing = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        // The email was found on an existing user, return a 400 with a message
        // that can be displayed by the caller and return early.
        if (existing) {
            res.status(400).json({message: "That email is already taken"});
            return;
        }

        // The email is not already taken so proceed with creating a new
        // user in the database.
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            },
        });

        const successDto: RegisterSuccessDto = {
            username: user.username,
            email: user.email,
            role: user.role
        }

        res.status(200).json({
            message: 'User registered',
            token: generateToken(user),
            user: successDto
        });
    } catch (error) {
        console.log(error);
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

        const successDto: LoginSuccessDto = {
            username: user.username,
            email: user.email,
            role: user.role
        }

        res.json({
            message: "Logged in successfully",
            token: generateToken(user),
            user: successDto,
        })
    } catch (error) {
        console.log(`Caught error logging in with email ${email}`);
        res.status(500).json({message: "Internal server error, user not logged in"});
    }
});

function generateToken(user: User) {
    return jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
}

export default router;