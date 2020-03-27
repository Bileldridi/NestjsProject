import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from './user.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userSchema: Model<User>) { }

    async addUser(email: string, password: string) {
        const newUser = new this.userSchema({
            email,
            password
        })
        const result = await newUser.save();
        return result.id as string;
    }

    async getUsers() {
        const users = await this.userSchema.find();
        return users.map((user) => ({ id: user.id, email: user.email, password: user.password, products: user['products'] }));
    }

    async getUser(userId: string) {
        let user;
        try {
            user = await this.userSchema.findById(userId);
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }
        return { id: user.id, email: user.email, password: user.password };
    }

    async updateUser(userId: string, userUpdate: Partial<User>) {
        const updatedUser = await this.userSchema.findByIdAndUpdate({ _id: userId }, userUpdate);
        return updatedUser;

    }

    async deleteUser(id: string) {
        const result = await this.userSchema.deleteOne({ _id: id });
        if (result.n === 0) {
            throw new NotFoundException('Could not find product.');
        }
    }

    async addId(userId: string, prodId: string) {
        const updateId = await this.userSchema.findByIdAndUpdate({ _id: userId }, { $push: { products: prodId } });
        return updateId;
    }

    async removeId(userId: string, prodId: string) {
        const updateId = await this.userSchema.findByIdAndUpdate({ _id: userId }, { $pull: { products: prodId } });
        return updateId;
    }

    async popProd() {
        const populated = await this.userSchema.find().populate({path:'products'}).exec();
        return populated;
    }

}