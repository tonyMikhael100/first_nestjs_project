import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserType } from "../user-role.enum";

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @IsOptional()
    password: string;

    @IsOptional()
    @IsEnum(UserType)
    @IsOptional()
    userType?: UserType;
}