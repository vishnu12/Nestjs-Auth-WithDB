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

    async getPosts():Promise<CreatePostDto[]>{
       return await this.postModel.find({})
    }

    async getPostById(id:string):Promise<CreatePostDto>{
      return await this.postModel.findById(id)
    }

    async update(id:string,body:CreatePostDto):Promise<any>{
        try {
          const updatedPost=await this.postModel.findOneAndUpdate({_id:id},{post:body.post},{new:true})
          return updatedPost
        } catch (error) {
          throw new HttpException('Post updation failed',400)
        }
    }

    async delete(id:string){
      try {
        await this.postModel.findOneAndRemove({_id:id})
        return {message:'Item removed'}
      } catch (error) {
        throw new HttpException('Post deletion failed',400)
      }
    }
}
