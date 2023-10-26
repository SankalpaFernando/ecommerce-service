import { Prisma } from '@prisma/client';
import { PrismaService } from './../db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  getAllCategories() {
    return this.prismaService.category.findMany();
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    console.log(data);
    const { id } = await this.prismaService.category.create({ data });
    return {
      id,
      createdAt: Date.now(),
    };
  }
}
