import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUniqueUser(
    userWhereInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    console.log('Controller');
    return await this.prismaService.user.findUnique({
      where: userWhereInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if (await this.getUniqueUser({ email: data.email })) {
      throw new BadRequestException('User already exists');
    }
    return await this.prismaService.user.create({ data });
  }
}
