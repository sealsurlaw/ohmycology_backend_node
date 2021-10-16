import { Request, Response } from "express";
import { Comment } from "../entities/comment";
import { Post } from "../entities/post";
import { deletedCommentByUuid, saveComment } from "../store/comment_store";
import { findPostByUuid } from "../store/post_store";

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

router.delete("/:commentUuid", (req: Request, res: Response) => {
    deletedCommentByUuid(req.params.commentUuid)
        .then((post?: Post) => {
            return res.sendStatus(202)
        })
        .catch(err => {
            return res.sendStatus(500)
        })
})

export default router