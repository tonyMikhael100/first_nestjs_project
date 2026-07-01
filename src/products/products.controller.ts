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
    ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { UserService } from 'src/users/user.service';
import { ConfigService } from '@nestjs/config';



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
    createNewProduct(@Body() body: CreateProductDto) {
        return this.productService.createNewProduct(body);
    }
    @Get()
    getAllProducts() {

        return this.productService.getAllProducts();
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