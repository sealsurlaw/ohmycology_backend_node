import { Request, Response } from "express";
import { User } from "../entities/user";
import { findUserByUsername, updateUserByUuid } from "../store/user_store";

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

router.put("/:uuid", (req: Request, res: Response) => {
    updateUserByUuid(req.params.uuid, req.body)
        .then(() => {
            return res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            return res.sendStatus(500)
        })
})

export default router