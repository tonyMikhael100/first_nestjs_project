import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CurrentUser } from 'src/users/decorator/curretn-user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';

@Controller('/api/reviews')
@UseGuards(AuthGuard)
export class ReviewsController {

    constructor(
        private readonly reviewService: ReviewsService,
    ) { }



    @Get('/:productId')
    getAllReviewsForProduct(@Param('productId') productId: number) {
        return this.reviewService.getAllReviews(productId);
    }

    @Post()
    createReview(@Body() body: CreateReviewDto, @CurrentUser() userPaylod) {
        return this.reviewService.createReview(userPaylod, body);
    }

    @Delete('/:reviewId')
    deleteReviewById(@Param('reviewId') reviewId: number) {
        return this.reviewService.deleteReviewById(reviewId);
    }
}
