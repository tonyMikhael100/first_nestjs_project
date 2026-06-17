import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./users/user.controller";
import { UserService } from "./users/user.service";
import { UserModule } from "./users/user.module";
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [UserModule, ProductsModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule { }
