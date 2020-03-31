// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import * as jwt from 'jsonwebtoken';
// import * as passport from 'passport';
// import { Strategy} from 'passport-http-bearer';
// import { PassportStrategy } from '@nestjs/passport';
// import { UsersService } from "../users/users.service";


// @Injectable()
// export class Passport extends PassportStrategy(Strategy) {

//     constructor(private readonly usersService: UsersService) {
//         super();
//     }
//     async validate(token: string) {
//         const user = await this.usersService.findOneByToken(token);
//         if(!user){
//             return new UnauthorizedException();
//         }
//         return user;
//     }
// }