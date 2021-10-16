import { User } from "../entities/user"

const sanitizeUser = (user: User): User => {
    return {
        uuid: user.uuid,
        username: user.username,
        role: user.role,
        bio: user.bio,
    }
}

export { sanitizeUser }