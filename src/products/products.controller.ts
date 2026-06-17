import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

type ProductType = {
    id: number;
    name: string;
    price: number;
};

@Controller('/api/products')
export class ProductsController {
    private products: ProductType[] = [
        {
            id: 1,
            name: 'iPhone 17 Pro Max',
            price: 1299,
        },
        {
            id: 2,
            name: 'Samsung S26 Ultra',
            price: 1199,
        },
    ];

    @Post()
    createNewProduct(@Body() body: CreateProductDto) {
        const newProduct: ProductType = {
            id: this.products.length + 1,
            name: body.name,
            price: body.price,
        };

        this.products.push({
            id: this.products.length + 1,
            name: body.name,
            price: body.price,
        });

        return {
            success: true,
            message: 'Product created successfully',
            data: newProduct,
        };
    }

    @Get()
    getAllProducts() {
        return {
            success: true,
            dataCount: this.products.length,
            data: this.products,
        };
    }

    @Get('/:id')
    getSingleProduct(@Param('id') id: number) {
        const product = this.products.find((p) => {
            return p.id === Number(id);
        });

        if (!product) {
            // for return error with custom message and status code 404
            throw new BadRequestException('Invalid product id');
        }
        return {
            success: true,
            data: product,
        };
    }

    @Put('/:id')
    updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
        let product = this.products.find((p) => {
            return p.id === Number(id);
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (body.name) product.name = body.name;
        if (body.price) product.price = Number(body.price);

        return {
            success: true,
            data: product,
        };
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {

        const index = this.products.findIndex(
            (p) => p.id === Number(id),
        );

        if (index === -1) {
            throw new NotFoundException(
                'Product not found',
            );
        }

        const deletedProduct = this.products[index];
        this.products.splice(index, 1);
        return {
            success: true,
            message: 'Product deleted successfully',
            data: deletedProduct,
        }

    }
}