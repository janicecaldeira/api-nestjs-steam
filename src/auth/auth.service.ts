import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from '../users/user.entity';
import { UserRole } from 'src/users/user-roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }
}
