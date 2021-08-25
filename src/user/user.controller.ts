import { Body, Controller, Get, Param } from '@nestjs/common';
import { CreatedUserDto, } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(
        private userService:UserService,
        // private authService:AuthService
    ){}

    @Get('user/:email')
    async findUser(@Param('email') email:string):Promise<CreatedUserDto>{
        return await this.userService.findUser(email)
    }


}
