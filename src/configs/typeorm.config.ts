import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admSteam',
  password: 'admSteam',
  database: 'steam',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
