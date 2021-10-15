import { Request, Response } from "express";
import { Comment } from "../entities/comment";
import { Post } from "../entities/post";
import { saveComment } from "../store/comment_store";
import { findPostByUuid, savePost } from "../store/post_store";

var express = require('express')
var router = express.Router()

router.post("/", (req: Request, res: Response) => {
    const postUuid: string = req.body.postId
    const userId: number = req.body._user.id
    const content: string = req.body.content

    findPostByUuid(postUuid)
        .then((post?: Post) => {
            saveComment({
                postId: post!.id,
                user: {
                    id: userId
                },
                content: content,
            })
                .then((comment: Comment) => {
                    return res.send(comment)
                })
        })

    saveComment
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