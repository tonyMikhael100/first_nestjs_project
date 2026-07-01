
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class ProductsService {


    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>) { }

    async createNewProduct(createPorductDto: CreateProductDto) {
        // must convert fist the dto to product entity by this line first 
        const product = this.productsRepository.create(createPorductDto);
        //then save it in table 
        return await this.productsRepository.save(product);
    }

    async getAllProducts() {
        return await this.productsRepository.find({ order: { id: 'ASC' } });
    }


    async getSingleProduct(id: number) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new BadRequestException({ message: "this prodcut not found" });
        }
        return product;

    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto) {
        // 1- we got the product first and make sure it exist 
        const product = await this.productsRepository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        //2- update the information of dto  

        if (updateProductDto.name) {
            product.name = updateProductDto.name;
        }
        if (updateProductDto.price !== undefined) {
            product.price = Number(updateProductDto.price);
        }
        if (updateProductDto.description) {
            product.description = updateProductDto.description;
        }
        await this.productsRepository.save(product);
        return {
            success: true,
            data: product,
        };
    }

    async deleteProduct(id: number) {

        const prodcut = this.productsRepository.findOneBy({ id })

        if (!prodcut) {
            throw new NotFoundException(
                'Product not found',
            );
        }

        const deletedProduct = await this.productsRepository.delete({ id });
        return {
            success: true,
            message: 'Product deleted successfully',
            data: deletedProduct,
        }

    }

}
