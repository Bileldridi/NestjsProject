import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.interface';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

   constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description, 
            price
        })
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({id: prod.id, title: prod.title, description: prod.description, price: prod.price}));
    }

    async getProduct(productId:string) {
        const product = await this.findProduct(productId);
        return {id: product.id, title: product.title, description: product.description, price: product.price};
    }

    async updateProduct(id: string, prodUpdate: Partial<Product>) {
         await this.productModel.findByIdAndUpdate({_id: id}, prodUpdate, { new: true });
    }

    async deleteProduct(id: string) {
        const result = await this.productModel.deleteOne({_id: id}).exec();
        if(result.n === 0) {
            throw new NotFoundException('Could not find product.');
        }
    }

    private async findProduct(id: string) {
       let product;
        try{
            product = await this.productModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException('Could not find product.');
        }
        if(!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }
}