import { Request, Response } from "express";
import { Post } from "../entities/post";
import { findPostByUuid, savePost } from "../store/post_store";

var express = require('express')
var router = express.Router()

router.post("/", (req: Request, res: Response) => {
    savePost(req.body)
        .then(post => {
            return res.send(post)
        })
})

router.get("/:postUuid", (req: Request, res: Response) => {
    findPostByUuid(req.params.postUuid)
        .then((post?: Post) => {
            if (post === undefined) {
                return res.sendStatus(404)
            }

            return res.send(post)
        })
})

export default router