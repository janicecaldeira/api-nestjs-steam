import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { GameRepository } from './games.repository';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
  // imports: [TypeOrmModule.forFeature([GameRepository])],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
