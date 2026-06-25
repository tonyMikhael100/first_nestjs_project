import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';
import { ProductEntity } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([ProductEntity])

    ],
    controllers: [ProductsController],
    providers: [ProductsService],


})
export class ProductsModule { }
