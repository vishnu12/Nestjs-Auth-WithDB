import { PostDocument } from "src/schemas/post/post.schema";
import { User } from "src/schemas/user/user.schema";


export interface CreatePostDto extends PostDocument{
    post:string
    user:User
}

