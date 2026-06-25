import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ReviewsService } from "src/reviews/reviews.service";


@Controller('/api/users')
export class UserController {

    constructor(private readonly reviewsService: ReviewsService, private readonly userService: UserService) { }

    @Get('/')
    getAllUsers() {
        this.userService.getAllUsers();
    }

    @Get('/single')
    getSingleUser(): String {
        return this.userService.getSingleUser();
    }
}