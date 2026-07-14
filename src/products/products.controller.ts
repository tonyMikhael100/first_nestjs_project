import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { UserService } from 'src/users/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthRolesGuard } from 'src/users/guards/auth-roles.guard';
import { Roles } from 'src/users/decorator/roles.decorator';
import { UserType } from 'src/users/user-role.enum';
import { CurrentUser } from 'src/users/decorator/curretn-user.decorator';
import { AuthGuard } from 'src/users/guards/auth.guard';



@UseGuards(AuthGuard)
@Controller('/api/products')
export class ProductsController {

    // private productService: ProductsService;
    // constructor(productService: ProductsService) {
    //     this.productService = productService;
    // }

    //or 
    constructor(
        private readonly productService: ProductsService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,

    ) { }

    @Post()
    @UseGuards(AuthRolesGuard)
    @Roles(UserType.Admin)
    createNewProduct(@Body() body: CreateProductDto, @CurrentUser() userPayload) {
        return this.productService.createNewProduct(body, userPayload);
    }
    @Get()
    getAllProducts(@Query('name') name: string, @Query('minPrice') minPrice: string, @Query('maxPrice') maxPrice: string) {
        return this.productService.getAllProducts(name, minPrice, maxPrice);
    }
    @Get('/:id')
    getSingleProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getSingleProduct(id);
    }

    @Put('/:id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
        return this.productService.updateProduct(id, body);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }
}