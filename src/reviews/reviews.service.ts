
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';

@Injectable()
export class ReviewsService {

    // to fix the issue of servie depend on service circular 
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService) { }

}
