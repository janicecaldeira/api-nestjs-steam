import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'E-mail do usuário',
    default: '',
  })
  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(200, { message: 'O e-mail deve ter menos de 200 caracteres' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Confirmação do e-mail do usuário',
    default: '',
  })
  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(200, { message: 'O e-mail deve ter menos de 200 caracteres' })
  emailConfirmation: string;

  @ApiProperty({
    type: String,
    description: 'País do usuário',
    default: 'Brasil',
  })
  @IsString()
  @IsNotEmpty({ message: 'Informe o seu país' })
  @MaxLength(60, {
    message: 'O país deve ter menos de 60 caracteres',
  })
  country: string;

  @ApiProperty({
    type: Number,
    description: 'Idade do usuário',
    default: 20,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Informe a sua idade' })
  age: number;

  @ApiProperty({
    type: String,
    description: 'Username do usuário',
    default: '',
  })
  @IsString()
  @IsNotEmpty({ message: 'Informe um nome de usuário' })
  @MaxLength(200, { message: 'O nome deve ter menos de 200 caracteres' })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    default: '',
  })
  @IsString()
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Confirmação da senha do usuário',
    default: '',
  })
  @IsString()
  @IsNotEmpty({ message: 'Informe a confirmação da senha' })
  @MinLength(8, {
    message: 'A confirmação da senha deve ter pelo menos 8 caracteres',
  })
  passwordConfirmation: string;

  @ApiProperty({
    type: String,
    description: 'Jogos associados ao usuário',
    default: '',
  })
  @IsString({ each: true })
  games: string[];
}
