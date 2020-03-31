import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ApisController } from './apis/apis.controller';
import { ApisService } from './apis/apis.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ProductsModule, UsersModule, AuthModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, ApisController],
  providers: [AppService, ApisService],
})
export class AppModule {}
