import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async addUser(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string
    ) {
        const generatedId = await this.usersService.addUser(userEmail, userPassword);
        return { id: generatedId };
    }

    @Get()
    async getUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }
    @Get('pop')
    async populate() {
        const pop = await this.usersService.popProd();
        return pop;
    }
    // wa9telli t3ayet lel pop hedhi li 9a3da t'executi 5ater 3amel get w direct variable donc ki ta3mel /pop el pop walla ya9ra variable 
    // w i5addem hedhi heka 3leh talla3et el pop fou9 el api hedhi 
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

    @Patch('add/:userId/:prodId')
    addId(
        @Param('userId') userId: string,
        @Param('prodId') prodId: string
    ) {
        const updatedId = this.usersService.addId(userId, prodId);
        return updatedId;
    }

    @Patch('remove/:userId/:prodId')
    removeId(
        @Param('userId') userId: string,
        @Param('prodId') prodId: string
    ) {
        const updatedId = this.usersService.removeId(userId, prodId);
        return updatedId;
    }



}