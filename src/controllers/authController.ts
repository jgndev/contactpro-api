/// <reference types="express" />
/// <reference path="../custom.d.ts" />

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import app from '../app';
import {getRepository} from "typeorm";
import {User} from "../models/user";
import {RegisterDto} from "../dto/registerDto";
import {LoginDto} from "../dto/loginDto";
import {TokenPayload} from "../interfaces/tokenPayload";

app.post('/register', async (req, res) => {
    const {username, email, password}: RegisterDto = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const userRepository = getRepository(User);

    const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
    });

    await userRepository.save(newUser);

    res.status(201).json({message: "User registered", user: newUser})
});

app.post('/login', async (req, res) => {
    const {email, password}: LoginDto = req.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(404).json({message: "User not found"});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({message: "Invalid username or password"});
    }

    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET as string, {expiresIn: '1h'});

    res.json({
        message: "Logged in successfully",
        token,
        user,
    })
});

function isAdmin(req: any, res: any, next: any) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({message: "Forbidden"});
    }
}

app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return next(); // continue if no token

    // jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken: any) => {
    //     if (err) {
    //         return res.status(401).json({error: "Unauthorized"})
    //     } else {
    //         // req.user = user;
    //         // next();
    //         req.user = {
    //             id: decodedToken.id,
    //             role: decodedToken.role,
    //         };
    //         next();
    //     }
    // });

    // jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedToken: TokenPayload) => {
    //     if (err || !decodedToken) {
    //         return res.status(401).json({error: "Unauthorized"})
    //     } else {
    //         req.user = {
    //             id: decodedToken.id,
    //             role: decodedToken.role,
    //         };
    //         next();
    //     }
    // });

    app.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return next(); // continue if no token

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

            if (!decodedToken) {
                return res.status(401).json({error: "Unauthorized"})
            }

            const payload = decodedToken as TokenPayload;


            req.user = {
                id: payload.id,
                role: payload.role
            };
        } catch (error) {
            return res.status(401).json({error: "Unauthorized"});
        }
    });


});