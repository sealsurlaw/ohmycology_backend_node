import { User } from "./user";

interface Message {
    id: number,
    uuid: string,
    user1: User,
    user2: User,
    content: string,
    createdAt: Date,
}

export { Message };