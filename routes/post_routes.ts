import { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import { Post } from "../entities/post";
import { findPostByUuid, listPosts, savePost, updatePostImage } from "../store/post_store";

var express = require('express')
var router: Router = express.Router()

router.post("/", (req: Request, res: Response) => {
    req.body.user = {
        id: req.body._user.id
    }

    savePost(req.body)
        .then(post => {
            return res.send(post)
        })
})

router.post("/:postUuid/image", (req: Request, res: Response) => {
    if (req.files === undefined) {
        return res.sendStatus(400)
    }

    updatePostImage((req.files.file as UploadedFile).data, req.params.postUuid)
        .then(() => {
            return res.sendStatus(201)
        })
        .catch((err) => {
            console.log(err)
            return res.sendStatus(500)
        })
})

router.get("/", (req: Request, res: Response) => {
    listPosts()
        .then((posts: Post[]) => {
            return res.send(posts)
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