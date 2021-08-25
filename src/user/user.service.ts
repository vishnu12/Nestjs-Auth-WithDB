import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User,UserDocument } from 'src/schemas/user/user.schema';
import { CreatedUserDto, CreateUserDto, loggedInUserDto, LoginUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>
    ){}

    async register(body:CreateUserDto):Promise<CreatedUserDto>{
       try {
           const {email}=body
           const userExists=await this.userModel.findOne({email})
           if(userExists){
            throw new HttpException('User Already exists',400)
           }else{
            const newUser=new this.userModel(body)
            const createdUser= await newUser.save()
            createdUser.password=undefined
            return createdUser
           }
           
       } catch (error) {
           throw new HttpException(`${error}`,400)
       }
    }

    async findUser(email:string):Promise<any>{
       try {
        const user= await this.userModel.findOne({email})
        if(user) return user
        throw new HttpException('User not found',404)
       } catch (error) {
        throw new HttpException(`${error}`,400)
       }
    }
}
