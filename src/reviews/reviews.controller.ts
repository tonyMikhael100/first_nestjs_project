/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { UserService } from 'src/users/user.service';

@Controller()
export class ReviewsController {

    constructor(private readonly userService: UserService) { }
}
