import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { BetsModule } from 'src/bets/bets.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  imports: [BetsModule],
  exports: [GamesService]
})
export class GamesModule {}
