import { Post } from "./post";
import { User } from "./user";

interface Comment {
    id?: number,
    uuid?: string,
    postId?: number,
    user?: User,
    content?: string,
    createdAt?: Date,
    deletedAt?: Date,
}

export { Comment }