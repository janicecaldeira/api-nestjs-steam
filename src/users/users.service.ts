import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else if (createUserDto.email != createUserDto.emailConfirmation) {
      throw new UnprocessableEntityException('Os e-mails não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
}
