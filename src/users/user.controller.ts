import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ReviewsService } from "src/reviews/reviews.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AuthGuard } from "./guards/auth.guard";


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
    async getCurrentUser(@Req() req: any) {
        return await this.userService.getCurrentUser((req as any).userPayload)
    }

}