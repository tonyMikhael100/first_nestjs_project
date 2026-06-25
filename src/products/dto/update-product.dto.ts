import { IsInt, isNotEmpty, IsNotEmpty, IsOptional, IsPositive, IsString, Length, Min } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    @IsPositive() // or @Min(0,{message:"price must be greater than 0"})
    price: number;
}