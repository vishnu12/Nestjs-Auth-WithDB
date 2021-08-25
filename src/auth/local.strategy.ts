import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField:'email'});
  }
  async validate(email:string,password:string): Promise<any> {
    const userExists = await this.authService.validateUser(email,password);
    if (!userExists) {
      throw new UnauthorizedException();
    }
    return userExists;
  }
}