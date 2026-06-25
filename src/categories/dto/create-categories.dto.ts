import { isNotEmpty, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    @Min(1)
    @IsNotEmpty()
    count: number;

}