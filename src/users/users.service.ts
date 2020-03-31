import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from './user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userSchema: Model<User>) { }

    async create(email: string, password: string) {
        const user = await this.userSchema.findOne({email});
        if (user) {
            throw new NotFoundException('Mail already exists');
        }
        const newUser = new this.userSchema({
            email,
            password
        })
        const result = await newUser.save();
        console.log(result);
        
        return result;
    }

    async findByLogin(email: string, password: string) {
        const user = await this.userSchema.findOne({email});
        if (!user) {
            throw new NotFoundException('Invalid Mail');
        }

        if(await bcrypt.compare(password, user.password)){
            return user;
        }
        }
        

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

    // async findOneByToken(token) {
    //     if (token === 'ironNest')
    //     return  {message: 'Auth successful',
    //     token: token};
    //     else
    //     return null;
    // }

    async findByPayload(payload: any) {
        const {email} = payload;
        return await this.userSchema.findOne({email});
    }

}