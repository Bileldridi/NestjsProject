import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    id: string;
    email: string;
    password: string;
    products: [string];
}