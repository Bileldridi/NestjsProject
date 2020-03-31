import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        });
    }

    async validate(payload: any, done: VerifiedCallback) {

        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done( new NotFoundException('Mail already exists'));
        }
        console.log(payload);
        
        return done(null, user, payload.iat);
    }
}