import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/role/role.enum';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;
  role: Role;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
