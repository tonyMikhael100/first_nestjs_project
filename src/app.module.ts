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
import { Product } from './products/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Review } from './reviews/reviews.entity';

const envFile = '.env.' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'development');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFile,
      isGlobal: true,
    }),
    CategoriesModule,
    UserModule,
    ProductsModule,
    ReviewsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        database: configService.get('DB_NAME'),
        synchronize: process.env.ge !== 'production',
        entities: [Product, User, Review],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
