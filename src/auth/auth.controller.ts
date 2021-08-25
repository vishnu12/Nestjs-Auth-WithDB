import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CreatedUserDto, CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';



@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post('register')
    async register(
        @Body() body: CreateUserDto
    ): Promise<CreatedUserDto> {
        return this.userService.register(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)  
    }

    @UseGuards(LocalAuthGuard)
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }

}