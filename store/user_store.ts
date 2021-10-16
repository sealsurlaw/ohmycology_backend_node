import { IBaseProtocol } from "pg-promise";
import database from "../config/database";
import { User } from "../entities/user";

const db: IBaseProtocol<any> = database;

const saveUser = async (user: User) => {
    await db.any(`
        INSERT INTO users (
            email,
            username,
            password,
            bio
        ) VALUES (
            $1, $2, $3, $4
        )
    `, [user.email, user.username, user.password, user.bio])
}

const findUserById = async (id: number): Promise<User> => {
    const data = await db.one(`
        SELECT
            id,
            uuid,
            role,
            username,
            password,
            email,
            first_name,
            last_name,
            bio,
            created_at,
            deleted_at
        FROM users
        WHERE id = $1
    `, [id]);

    return {
        id: data.id,
        uuid: data.uuid,
        role: data.role,
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        bio: data.bio,
        createdAt: data.created_at,
        deletedAt: data.deleted_at,
    } as User;
}

const findUserByUsername = async (username: string): Promise<User> => {
    const data = await db.one(`
        SELECT id
        FROM users
        WHERE username = $1
    `, [username]);

    return findUserById(data.id)
}

const findUserByUuid = async (uuid: string): Promise<User> => {
    const data = await db.one(`
        SELECT id
        FROM users
        WHERE uuid = $1
    `, [uuid]);

    return findUserById(data.id)
}

const updateUserByUuid = async (uuid: string, user: User) => {
    await db.any(`
        UPDATE users SET
            first_name = $1,
            last_name = $2,
            email = $3,
            username = $4,
            bio = $5
        WHERE
            uuid = $6
    `, [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.bio,
        uuid
    ])
}

export { saveUser, findUserById, findUserByUsername, findUserByUuid, updateUserByUuid };
