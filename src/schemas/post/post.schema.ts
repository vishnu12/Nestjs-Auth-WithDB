import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose'
import { User } from '../user/user.schema';

export type PostDocument=Post & Document

@Schema()
export class Post{
  
    @Prop({required:true})
    content:string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User

}

export const PostSchema=SchemaFactory.createForClass(Post)