import { Comment } from "./comment";
import { User } from "./user";

interface Post {
    id?: number,
    uuid?: string,
    user?: User,
    title?: string,
    color?: string,
    heightInCm?: number,
    diameterInCm?: number,
    cap?: string,
    stem?: string,
    underside?: string,
    sporePrint?: string,
    texture?: string,
    substrate?: string,
    location?: string,
    description?: string,
    family?: string,
    genus?: string,
    commonName?: string,
    edible?: string,
    image?: File,
    comments?: Comment[],
    createdAt?: Date,
    deletedAt?: Date,
}

export { Post };