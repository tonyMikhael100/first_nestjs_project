import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        CategoriesController,
    ],
    providers: [
        CategoriesService,
    ],
})
export class CategoriesModule { }
