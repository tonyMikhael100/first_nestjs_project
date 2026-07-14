import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ReviewsService } from "src/reviews/reviews.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { LoginUserDto } from "./dtos/login-user.dto";
import { JwtPayloadType } from "./jwt-payload.type";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserType } from "./user-role.enum";



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

    ) { }

    /**
     * 
     * @param createUserDto 
     * @returns 
     */
    async registerUser(createUserDto: CreateUserDto) {
        const { userName, email, password, userType } = createUserDto;

        const existingUser = await this.userRepo.findOneBy({ email });
        if (existingUser) {
            throw new BadRequestException("Email already in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // must convert the data to enity by using create method 
        const newUser = this.userRepo.create({
            userName,
            email,
            password: hashedPassword,
            userType,
        });
        const savedUser = await this.userRepo.save(newUser);

        // genrate payload from id of user and type and make the access token and send it to user 
        const accessToken = await this.jwtService.signAsync({ id: savedUser.id, userType: savedUser.userType });

        return { accessToken, user: savedUser };
    }


    /**
     * 
     * @param loginUserDto 
     * @returns 
     */
    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepo.findOneBy({ email });
        if (!user) throw new BadRequestException("Invalid email or password");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new BadRequestException("Invalid email or password");
        // genrate payload from id of user and type and make the access token and send it to user 
        const accessToken = await this.jwtService.signAsync({ id: user.id, userType: user.userType });
        return { user: user, accessToken };
    }


    /**
     * 
     * @param bearerToken 
     * @returns 
     */

    async getCurrentUser(payload: JwtPayloadType) {
        const user = await this.userRepo.findOneBy({ id: payload.id });
        if (!user) throw new BadRequestException("User Not Found");
        return { user };
    }



    /**
     * 
     * @returns list of all users 
     */
    async getAllUsers(): Promise<User[]> {
        return await this.userRepo.find();
    }




    async updateUserInformation(
        userId: number,
        updateUserDto: UpdateUserDto,
    ) {
        const { password, userType } = updateUserDto;

        const user = await this.userRepo.findOneBy({ id: userId });

        if (!user) {
            throw new NotFoundException(
                'No user with this id',
            );
        }

        if (userType) {
            user.userType = userType;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(
                password,
                salt,
            );

            user.password = hashedPassword;
        }

        await this.userRepo.save(user);

        return {
            success: true,
            message: 'User updated successfully',
            data: user,
        };
    }

    async deleteUser(userId: number) {
        const user = await this.userRepo.findOneBy({ id: userId });

        if (!user) {
            throw new NotFoundException('No user with this id');
        }

        await this.userRepo.remove(user);
        return { success: true, message: 'User deleted successfully' };
    }
}