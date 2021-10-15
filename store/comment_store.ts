import { IBaseProtocol } from "pg-promise";
import database from "../config/database";
import { Comment } from "../entities/comment";

const db: IBaseProtocol<any> = database;

const saveComment = async (comment: Comment): Promise<Comment> => {
    const data = await db.one(`
        INSERT INTO comments (
            post_id,
            user_id,
            content
        ) VALUES (
            $1, $2, $3
        )
        RETURNING id
    `, [
        comment.postId,
        comment.user!.id,
        comment.content,
    ])

    const p: Comment | undefined = await findCommentById(data.id)
    return p!
}

const findCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    const data = await db.any(`
        SELECT
            c.id,
            c.uuid,
            c.post_id,
            c.user_id,
            u.uuid user_uuid,
            u.role,
            u.username,
            u.email,
            u.first_name,
            u.last_name,
            u.bio,
            u.created_at user_created_at,
            u.deleted_at user_deleted_at,
            c.content,
            c.created_at,
            c.deleted_at
        FROM comments c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE
            post_id = $1
    `, [postId])

    if (data.length === 0) {
        return []
    }

    const comments: Comment[] = []

    data.forEach(comment => {
        comments.push({
            id: comment.id,
            uuid: comment.uuid,
            postId: comment.post_id,
            user: {
                id: comment.user_id,
                uuid: comment.user_uuid,
                role: comment.role,
                username: comment.username,
                email: comment.email,
                firstName: comment.first_name,
                lastName: comment.last_name,
                bio: comment.bio,
                createdAt: comment.user_created_at,
                deletedAt: comment.user_deleted_at,
            },
            content: comment.content,
            createdAt: comment.created_at,
            deletedAt: comment.deleted_at,
        })
    })

    return comments
}

const findCommentById = async (id: number): Promise<Comment | undefined> => {
    const data = await db.one(`
        SELECT
            c.id,
            c.uuid,
            c.post_id,
            c.user_id,
            u.uuid user_uuid,
            u.role,
            u.username,
            u.email,
            u.first_name,
            u.last_name,
            u.bio,
            u.created_at user_created_at,
            u.deleted_at user_deleted_at,
            c.content,
            c.created_at,
            c.deleted_at
        FROM comments c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE
            c.id = $1
    `, [id])

    if (data === undefined) {
        return undefined
    }

    return {
        id: data.id,
        uuid: data.uuid,
        postId: data.post_id,
        user: {
            id: data.user_id,
            uuid: data.user_uuid,
            role: data.role,
            username: data.username,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            bio: data.bio,
            createdAt: data.user_created_at,
            deletedAt: data.user_deleted_at,
        },
        content: data.content,
        createdAt: data.created_at,
        deletedAt: data.deleted_at,
    }
}

export { saveComment, findCommentsByPostId }
