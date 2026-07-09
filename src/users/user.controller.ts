import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AuthGuard } from "./guards/auth.guard";
import { CurrentUser } from "./decorator/curretn-user.decorator";
import type { JwtPayloadType } from "./jwt-payload.type";
import { Roles } from "./decorator/roles.decorator";
import { UserType } from "./user-role.enum";
import { AuthRolesGuard } from "./guards/auth-roles.guard";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller('/api/users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('/auth/register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.registerUser(createUserDto);
    }

    @Post('/auth/login')
    @HttpCode(HttpStatus.OK)// to be 200 the default is 201 this suitable for register not login 
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(loginUserDto);
    }

    @Get('/current-user')
    @UseGuards(AuthGuard)
    async getCurrentUser(@CurrentUser() userPayload) {
        return await this.userService.getCurrentUser(userPayload)
    }


    @Get()
    @Roles(UserType.Admin)
    @UseGuards(AuthRolesGuard)
    async getAllUsersForAdmin() {
        return await this.userService.getAllUsers();
    }

    @Delete()
    @UseGuards(AuthGuard)
    async deleteUser(@CurrentUser() userPayload: JwtPayloadType) {
        return await this.userService.deleteUser(userPayload.id);
    }

    @Put()
    @UseGuards(AuthGuard)
    async updateUserInformation(@CurrentUser() userPayload: JwtPayloadType, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUserInformation(userPayload.id, updateUserDto);
    }




}