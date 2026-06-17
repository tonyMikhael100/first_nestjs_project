import { IsString } from "class-validator";

export class UpdateProductDto {
    // optional parameter
    name?: string;
    price?: string;
}