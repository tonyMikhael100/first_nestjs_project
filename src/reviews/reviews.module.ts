import { forwardRef, Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';

@Module({
    imports: [forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Review]),
    ],
    providers: [ReviewsService],
    controllers: [ReviewsController],
    exports: [ReviewsService],


})
export class ReviewsModule { }
