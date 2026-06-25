import { forwardRef, Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';

@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [ReviewsService],
    controllers: [ReviewsController],
    exports: [ReviewsService],


})
export class ReviewsModule { }
