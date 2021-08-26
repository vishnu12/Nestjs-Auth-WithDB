import { Body, Controller, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
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
    @Put('/:id')
    async update(
        @Param('id') id:string
    ){
        return await this.postService.update(id)
    }
}
