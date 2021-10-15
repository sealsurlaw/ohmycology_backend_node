import { Request, Response } from "express";
import { User } from "../entities/user";
import { findUserByUsername } from "../store/user_store";

var express = require('express')
var router = express.Router()

router.get("/:username", (req: Request, res: Response) => {
    findUserByUsername(req.params.username)
        .then((user: User) => {
            if (user === undefined) {
                return res.sendStatus(404)
            }

            return res.send(user)
        })
})

export default router