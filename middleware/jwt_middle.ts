import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user";
import { findUserByUuid } from "../store/user_store";
require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, data: any) => {
        if (err) return res.sendStatus(403)

        findUserByUuid(data.id).then((user: User) => {
            req.body._user = user
            next()
        })
    })
}

export { jwtMiddleware }