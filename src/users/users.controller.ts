import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Sucesso ao criar' })
  @ApiForbiddenResponse({ description: 'Não permitido' })
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);
    return {
      user,
      message: 'Usuário cadastrado com sucesso!',
    };
  }

  @Post('/adm')
  @ApiCreatedResponse({ description: 'Sucesso ao criar' })
  @ApiForbiddenResponse({ description: 'Não permitido' })
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get('/all')
  @ApiOkResponse({ description: 'Sucesso ao listar' })
  @ApiForbiddenResponse({ description: 'Não permitido' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  @ApiOkResponse({ description: 'Sucesso ao listar' })
  @ApiForbiddenResponse({ description: 'Não permitido' })
  @Role(UserRole.ADMIN)
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.usersService.findUsers(query);

    return {
      found,
      message: 'Usuários encontrados',
    };
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Sucesso ao listar' })
  @ApiForbiddenResponse({ description: 'Não permitido' })
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Sucesso ao atualizar' })
  @ApiForbiddenResponse({ description: 'Não permitido' })
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id != id)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Sucesso ao deletar' })
  @ApiForbiddenResponse({ description: 'Não permitido' })
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return { message: 'Usuário excluído com sucesso' };
  }
}
