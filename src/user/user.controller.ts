import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    console.log('Hello');
    Logger.warn('Warn');
    return 'Hello World';
  }
}
