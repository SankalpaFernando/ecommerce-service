import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/role/role.enum';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(name: string, password: string, email: string, role: Role) {
    const hash = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      name,
      password: hash,
      email,
      role,
    });

    return {
      id: user.id,
      createdAt: Date.now(),
    };
  }

  async isAuthorized(role: Role, authorizedRoles: Role[]) {
    if (authorizedRoles.includes(role)) {
      return {
        allowed: true,
      };
    }
    return {
      allowed: false,
    };
  }

  async signIn(email, password) {
    const user = await this.userService.getUniqueUser({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        user: user.email,
        role: user.role,
      }),
    };
  }
}
