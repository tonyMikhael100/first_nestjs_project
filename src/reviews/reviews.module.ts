import { forwardRef, Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { UserModule } from 'src/users/user.module';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';

@Module({
    imports: [forwardRef(() => UserModule),
    ProductsModule,
    TypeOrmModule.forFeature([Review]),
    ],
    providers: [ReviewsService],
    controllers: [ReviewsController],
    exports: [ReviewsService],


})
export class ReviewsModule { }
