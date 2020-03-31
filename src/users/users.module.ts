import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ProductSchema } from "src/products/product.model";
import { AuthService } from "src/auth/auth.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])
    ],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
    exports: [UsersService]
})
export class UsersModule {}