

export class CreateUserDto{
    name:string
    email:string
    password:string
}

export class LoginUserDto{
    email:string
    password:string
}

export class loggedInUserDto{
    email:string
    token?:string
}

export class CreatedUserDto{
    name:string
    email:string
}