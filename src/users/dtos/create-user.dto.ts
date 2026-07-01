import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserType } from "../user-role.enum";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    userName?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(UserType)
    userType?: UserType;
}