import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ReviewsService } from "src/reviews/reviews.service";
import { ReviewsModule } from "src/reviews/reviews.module";

@Module({
    imports: [forwardRef(() => ReviewsModule)],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],


})
export class UserModule { }
