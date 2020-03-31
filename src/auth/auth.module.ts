import { Module } from '@nestjs/common';
import { AuthService } from "src/auth/auth.service";
import { JwtStartegy } from "src/auth/jwt.strategy";
import { UsersModule } from 'src/users/users.module';

@Module({
controllers: [],
imports: [UsersModule],
providers: [AuthService, JwtStartegy]
})
export class AuthModule {}
