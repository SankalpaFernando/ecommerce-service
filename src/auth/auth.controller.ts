import { Body, Controller, Get, Param, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { SignInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(
      signUpDto.name,
      signUpDto.password,
      signUpDto.email,
      signUpDto.role,
    );
  }

  @Post('authorized')
  @UseGuards(AuthGuard)
  getProfile(@Req() request: Request, @Query('roles') authorizedRoles: Role[]) {
    return this.authService.isAuthorized(request['user'].role, authorizedRoles);
  }
}
