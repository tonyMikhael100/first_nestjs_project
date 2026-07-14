import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ReviewsService } from "src/reviews/reviews.service";
import { ReviewsModule } from "src/reviews/reviews.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        forwardRef(() => ReviewsModule),
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    global: true,
                    secret: configService.get('MY_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get('EXPIRE_IN'),
                    }
                }
            }
        }),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService, JwtModule],


})
export class UserModule { }
