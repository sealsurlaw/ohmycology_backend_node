import { IBaseProtocol } from "pg-promise";
import database from "../config/database";
import { Post } from "../entities/post";
import { User } from "../entities/user";
import { findCommentsByPostId } from "./comment_store";

const db: IBaseProtocol<any> = database;

const savePost = async (post: Post): Promise<Post> => {
    const data = await db.one(`
        INSERT INTO posts (
            user_id,
            title,
            color,
            height_in_cm,
            diameter_in_cm,
            cap,
            stem,
            underside,
            spore_print,
            texture,
            substrate,
            location,
            description,
            family,
            genus,
            common_name,
            edible
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
        )
        RETURNING id
    `, [
        post.user!.id,
        post.title,
        post.color,
        post.heightInCm,
        post.diameterInCm,
        post.cap,
        post.stem,
        post.underside,
        post.sporePrint,
        post.texture,
        post.substrate,
        post.location,
        post.description,
        post.family,
        post.genus,
        post.commonName,
        post.edible,
    ])

    const p: Post | undefined = await findPostById(data.id)
    return p!
}

const updatePostImage = async (image: Buffer, postUuid: string) => {
    await db.any(`
        UPDATE posts SET
            image = $1
        WHERE uuid = $2
    `, [image, postUuid])
}

const listPosts = async (): Promise<Post[]> => {
    const data = await db.any(`
        SELECT
            p.id,
            p.uuid,
            p.user_id,
            u.uuid user_uuid,
            u.role,
            u.username,
            u.email,
            u.first_name,
            u.last_name,
            u.bio,
            u.created_at user_created_at,
            u.deleted_at user_deleted_at,
            p.title,
            p.color,
            p.height_in_cm,
            p.diameter_in_cm,
            p.cap,
            p.stem,
            p.underside,
            p.spore_print,
            p.texture,
            p.substrate,
            p.location,
            p.description,
            p.family,
            p.genus,
            p.common_name,
            p.edible,
            p.created_at,
            p.deleted_at
        FROM posts p
        LEFT JOIN users u ON u.id = p.user_id
    `)

    const posts: Post[] = []

    if (data.length === 0) {
        return posts
    }

    data.forEach(datum => {
        const post: Post = {
            id: datum.id,
            uuid: datum.uuid,
            user: {
                id: datum.user_id,
                uuid: datum.user_uuid,
                role: datum.role,
                username: datum.username,
                email: datum.email,
                firstName: datum.first_name,
                lastName: datum.last_name,
                bio: datum.bio,
                createdAt: datum.user_created_at,
                deletedAt: datum.user_deleted_at,
            },
            title: datum.title,
            color: datum.color,
            heightInCm: datum.height_in_cm,
            diameterInCm: datum.diameter_in_cm,
            cap: datum.cap,
            stem: datum.stem,
            underside: datum.underside,
            sporePrint: datum.spore_print,
            texture: datum.texture,
            substrate: datum.substrate,
            location: datum.location,
            description: datum.description,
            family: datum.family,
            genus: datum.genus,
            commonName: datum.common_name,
            edible: datum.edible,
            createdAt: datum.created_at,
            deletedAt: datum.deleted_at,
        }

        posts.push(post)
    })

    return posts
}

const findPostById = async (id: number): Promise<Post | undefined> => {
    const data = await db.one(`
        SELECT
            p.id,
            p.uuid,
            p.user_id,
            u.uuid user_uuid,
            u.role,
            u.username,
            u.email,
            u.first_name,
            u.last_name,
            u.bio,
            u.created_at user_created_at,
            u.deleted_at user_deleted_at,
            p.title,
            p.color,
            p.height_in_cm,
            p.diameter_in_cm,
            p.cap,
            p.stem,
            p.underside,
            p.spore_print,
            p.texture,
            p.substrate,
            p.location,
            p.description,
            p.family,
            p.genus,
            p.common_name,
            p.edible,
            p.created_at,
            p.deleted_at
        FROM posts p
        LEFT JOIN users u ON u.id = p.user_id
        WHERE
            p.id = $1
    `, [id])

    if (data === undefined) {
        return undefined
    }

    const post: Post = {
        id: id,
        uuid: data.uuid,
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
        title: data.title,
        color: data.color,
        heightInCm: data.height_in_cm,
        diameterInCm: data.diameter_in_cm,
        cap: data.cap,
        stem: data.stem,
        underside: data.underside,
        sporePrint: data.spore_print,
        texture: data.texture,
        substrate: data.substrate,
        location: data.location,
        description: data.description,
        family: data.family,
        genus: data.genus,
        commonName: data.common_name,
        edible: data.edible,
        createdAt: data.created_at,
        deletedAt: data.deleted_at,
    }

    post.comments = await findCommentsByPostId(id)

    return post
}

const findPostByUuid = async (uuid: string): Promise<Post | undefined> => {
    const data = await db.one(`
        SELECT id
        FROM posts
        WHERE uuid = $1
    `, [uuid])

    if (data === undefined) {
        return undefined
    }

    return findPostById(data.id)
}

const findPostImageByUuid = async (uuid: string): Promise<Buffer | undefined> => {
    const data = await db.one(`
        SELECT image
        FROM posts
        WHERE uuid = $1
    `, [uuid])

    if (data === undefined) {
        return undefined
    }

    return data.image
}

export { savePost, updatePostImage, listPosts, findPostById, findPostByUuid, findPostImageByUuid }
