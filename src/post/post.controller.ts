import { Body, Controller, Param, Post, Put, Request, UseGuards,Get, HttpException, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { isTaskOwner } from 'src/utils/helpers';
import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';


@Controller('posts')
export class PostController {
    constructor(
        private readonly postService:PostService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(
        @Request() req,
        @Body() body:CreatePostDto
    ){
      const post={...body,user:req.user.id} as CreatePostDto
      return await this.postService.create(post)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPosts():Promise<CreatePostDto[]>{
       return await this.postService.getPosts()
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async getPostById(
        @Param('id') id:string
    ):Promise<CreatePostDto>{
      return await this.postService.getPostById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async update(
        @Param('id') id:string,
        @Request() req,
        @Body() body:CreatePostDto
    ){
        const {user}=await this.getPostById(id) as CreatePostDto
        if(isTaskOwner(req.user.id,user)){
            return await this.postService.update(id,body)
        }else{
            throw new HttpException('You are not the task owner to update this post',401)
        }
        
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(
        @Param('id') id:string,
        @Request() req
    ){
        const {user}=await this.getPostById(id) as CreatePostDto
        if(isTaskOwner(req.user.id,user)){
            return await this.postService.delete(id)
        }else{
            throw new HttpException('You are not the task owner to delete this post',401)
        }
        
    }
    


}
