import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async addUser(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
        const generatedId = await this.usersService.addUser(userEmail, userPassword);
        return { id:generatedId };
    }

    @Get()
    async getUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.usersService.getUser(userId);
    }

    @Patch(':id')
    updateUser(
        @Param('id') userId: string,
        @Body() userUpdate: Partial<User>
    ) {
        const userUpdated = this.usersService.updateUser(userId, userUpdate);
        return userUpdated;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') userId: string) {
        await this.usersService.deleteUser(userId);
        return null;
    }
}