import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post/post.schema';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel:Model<PostDocument>
    ){}

    async create(postData:CreatePostDto):Promise<CreatePostDto>{
      try {
          const newPost=new this.postModel(postData)
          return await newPost.save()
      } catch (error) {
          throw new HttpException('Post creation failed',400)
      }
    }

    update(id:string){
      return {message:'route called for id'+id}
    }

    delete(){

    }
}
