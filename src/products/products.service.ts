import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Between, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/user.service';
import { JwtPayloadType } from 'src/users/jwt-payload.type';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly userService: UserService,
    ) { }

    async createNewProduct(createPorductDto: CreateProductDto, userPaylod: JwtPayloadType) {
        const { user } = await this.userService.getCurrentUser(userPaylod);
        const product = this.productsRepository.create({
            ...createPorductDto,
            name: createPorductDto.name.trim().toLowerCase(),
            user: user,
        });
        return await this.productsRepository.save(product);
    }

    async getAllProducts(name?: string, minPrice?: string, maxPrice?: string) {
        const filter: Record<string, any> = {};

        if (name) filter.name = Like(`%${name}%`);
        if (minPrice && maxPrice) filter.price = Between(Number(minPrice), Number(maxPrice));
        else if (minPrice) filter.price = Number(minPrice);
        else if (maxPrice) filter.price = Number(maxPrice);

        return await this.productsRepository.find({ where: filter, order: { id: 'ASC' } });
    }

    async getSingleProduct(id: number) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new BadRequestException({ message: "this prodcut not found" });
        }
        return product;
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
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
        return { success: true, data: product };
    }

    async deleteProduct(id: number) {
        const product = await this.productsRepository.findOneBy({ id })
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        await this.productsRepository.delete({ id });
        return { success: true, message: 'Product deleted successfully' }
    }
}
