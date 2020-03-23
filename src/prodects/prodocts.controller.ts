import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';

import { ProductsService } from './products..service';

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
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}
