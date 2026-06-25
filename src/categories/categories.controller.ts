import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-categories.dto";

@Controller('/api/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    getAllCategories() {
        return this.categoriesService.getAll();
    }
    @Get('/:id')
    getCategoryById(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.getById(id);
    }


    @Post()
    createCategory(@Body() createProductDto: CreateCategoryDto) {

        return this.categoriesService.createCategory(createProductDto);
    }
}