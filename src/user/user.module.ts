import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/db/prisma.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
