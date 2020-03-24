import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';

import { ProductsService } from './products..service';
import { Product } from './product.interface';

@Controller('products')
export class ProdutsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
       const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
       return { id: generatedId };
    }
    

    @Get()
    async getAllProducts() {
        const Products = await this.productsService.getProducts();
        return Products;
    }

    @Get(':id')
    getProdect(@Param('id') prodId: string) {
        return this.productsService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body() prodUpdate: Partial<Product>
    ) {
        this.productsService.updateProduct(prodId, prodUpdate);
        return null;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}
