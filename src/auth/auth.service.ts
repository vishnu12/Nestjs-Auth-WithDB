import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
        ){}
    async validateUser(email:string,password:string): Promise<any> {
        const userExists = await this.userService.findUser(email);
        if (userExists && await userExists.comparePassword(password)) {
          userExists.password=undefined
          return userExists;
        }
        return null;
}

async login(user:any){
  const payload={email:user.email,id:user.id}
  
  return {
      access_token:this.jwtService.sign(payload)
  }
}
}
