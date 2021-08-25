import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/schemas/user/user.schema';
import { comparePassword, preSaveFunction } from 'src/utils/helpers';
import { UserController } from './user.controller';





@Module({
  imports:[MongooseModule.forFeatureAsync([{name:User.name,
    useFactory:()=>{
      let schema=UserSchema
      schema.pre('save',preSaveFunction)
      schema.methods.comparePassword=comparePassword
      return schema
    }
  }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
