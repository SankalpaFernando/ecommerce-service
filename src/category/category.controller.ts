import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('all')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Post('add')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }
}
