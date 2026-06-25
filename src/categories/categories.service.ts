/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { retry } from 'rxjs';
import { CreateCategoryDto } from './dto/create-categories.dto';


type CategoriesType = {
    id: number,
    name: string,
    count: number,
};

@Injectable()
export class CategoriesService {

    private categories: CategoriesType[] = [
        {
            id: 1,
            name: "mobile",
            count: 13,
        },
        {
            id: 2,
            name: "tablet",
            count: 10,
        },
        {
            id: 3,
            name: "headphones",
            count: 20,
        },
    ];

    getAll() {
        if (!this.categories) {
            throw new BadRequestException();
        }
        return this.categories;
    }

    getById(id: number) {
        const category = this.categories.filter((c) => c.id === Number(id));
        if (!category) {
            throw new BadRequestException('Invalid Category id');
        }
        return category;
    }

    createCategory(createCategoryDto: CreateCategoryDto) {

        const category = {
            id: this.categories.length + 1,
            name: createCategoryDto.name,
            count: createCategoryDto.count,
        };
        return {
            succss: true,
            data: category,
        }
    }
}

