import { CategoriesModule } from './categories/categories.module';
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./users/user.controller";
import { UserService } from "./users/user.service";
import { UserModule } from "./users/user.module";
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './products/product.entity';

@Module({
  imports: [
    CategoriesModule,
    UserModule,
    ProductsModule,
    ReviewsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'mac',
      password: '123456',
      host: 'localhost',
      synchronize: true, // only in dev be true 
      database: 'first_project',
      entities: [ProductEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
