import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/user.service';
import { ProductsService } from 'src/products/products.service';
import { Review } from './reviews.entity';
import { Repository } from 'typeorm';
import { JwtPayloadType } from 'src/users/jwt-payload.type';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly productService: ProductsService,

        @InjectRepository(Review)
        private readonly reviewRepo: Repository<Review>

    ) { }

    async createReview(jwtPayload: JwtPayloadType, createReviewDto: CreateReviewDto) {
        const { user } = await this.userService.getCurrentUser(jwtPayload);
        const product = await this.productService.getSingleProduct(Number(createReviewDto.productId));
        const review = this.reviewRepo.create({
            ...createReviewDto,
            user: user,
            product,
        });
        const reviewResult = await this.reviewRepo.save(review);
        return {
            message: 'success',
            data: reviewResult,
        }
    }


    async getAllReviews(productId: number) {
        const reviews = await this.reviewRepo.find({
            where: { product: { id: productId } },
            order: { id: 'ASC' },
        });

        return {
            message: 'success',
            data: reviews
        }
    }


    async deleteReviewById(reviewId: number) {
        const review = await this.reviewRepo.findOneBy({ id: reviewId })
        if (!review) {
            throw new BadRequestException('this review not exist');
        } else {
            await this.reviewRepo.delete(reviewId);
        }
        return {
            message: 'Deleted successfully',
            data: review
        }
    }
}
