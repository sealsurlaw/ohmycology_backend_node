interface User {
    id?: number,
    uuid?: string,
    role?: Role,
    username?: string,
    password?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    createdAt?: Date,
    deletedAt?: Date,
}

enum Role {
    MOREL,
    CHANTERELLE,
    REISHI,
}

export { User, Role }