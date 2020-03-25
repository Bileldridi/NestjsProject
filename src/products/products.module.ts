import { Module } from '@nestjs/common';
import { ProductsService } from './products..service';
import { ProdutsController } from './prodocts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers: [ProdutsController],
    providers: [ProductsService]
})
export class ProductsModule {}