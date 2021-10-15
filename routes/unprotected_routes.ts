import { Request, Response } from "express";
import { User } from "../entities/user";
import { findUserByUsername, saveUser } from "../store/user_store";

var express = require('express')
const jwt = require('jsonwebtoken');
var router = express.Router()

router.post("/users", (req: Request, res: Response) => {
    const bcrypt = require('bcrypt');
    const saltRounds: number = 10;

    bcrypt.hash(req.body.password, saltRounds).then((hash: string) => {
        const user: User = {
            email: req.body.email,
            username: req.body.username,
            password: hash,
            bio: req.body.bio,
        }

        saveUser(user).then((user) => {
            return res.send(user);
        })
    });
})

router.post("/login", (req: Request, res: Response) => {
    const username: string = req.body.username
    const password: string = req.body.password

    findUserByUsername(username)
        .then((user: User) => {
            const bcrypt = require('bcrypt');
            bcrypt.compare(password, user.password).then((result: boolean) => {
                console.log(result)
                if (result === true) {
                    const token = jwt.sign({
                        id: user.uuid
                    }, process.env.JWT_SECRET, { expiresIn: '365d' });

                    return res.send(token)
                }
                else {
                    return res.sendStatus(401)
                }
            });
        })
})

export default router