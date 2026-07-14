import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Between } from "typeorm";

export class CreateReviewDto {

    @IsNumber()
    @IsNotEmpty()
    productId: number;


    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;
    @IsString()
    comment: string;


}