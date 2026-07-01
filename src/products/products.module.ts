import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],


})
export class ProductsModule { }
