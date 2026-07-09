import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserType } from "../user-role.enum";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsEnum(UserType)
    userType?: UserType;
}
