import * as bcrypt from 'bcryptjs'
import { HookNextFunction } from 'mongoose'
import { User, UserDocument } from 'src/schemas/user/user.schema'


export async function preSaveFunction(next:HookNextFunction){
   let user=this as UserDocument
   if(!user.isModified('password')){
    next()
}

const salt=await bcrypt.genSalt(10)
   user.password=await bcrypt.hash(user.password,salt)
}

export async function comparePassword(enteredPassowrd:string){
    let user=this as UserDocument
    return await bcrypt.compare(enteredPassowrd,user.password)
}

export const isTaskOwner=(loggedInUserID:string,postedUserId:string|User):Boolean=>{
     return loggedInUserID==postedUserId
}

