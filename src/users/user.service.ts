import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ReviewsService } from "src/reviews/reviews.service";



@Injectable()
export class UserService {

    constructor(
        @Inject(forwardRef(() => ReviewsService))
        private readonly reviewsService: ReviewsService) { }

    getAllUsers() {
        return {
            users: ['tony', 'mikel ', 'malak ', 'mina', 'bassant'],
        };
    }

    getSingleUser(): String {
        return 'this single only one  users ';
    }
}