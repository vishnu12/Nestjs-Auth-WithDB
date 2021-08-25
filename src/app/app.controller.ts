// import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { LocalAuthGuard } from 'src/auth/local-auth.guard';

// @Controller()
// export class AppController {
//   constructor(private authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Request() req){
//      return this.authService.login(req.user)
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile(@Request() req){
//     return req.user
//   }

// }
