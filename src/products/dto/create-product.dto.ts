import { IsString, IsNumber, IsNotEmpty, IsInt, IsPositive, Length } from 'class-validator';


// Dto is Data transfer object 
export class CreateProductDto {
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
