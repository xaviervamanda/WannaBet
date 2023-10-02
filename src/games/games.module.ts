import { Module, forwardRef } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { BetsModule } from '../bets/bets.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
  exports: [GamesService],
  imports: [forwardRef(() => BetsModule)],
  
})
export class GamesModule {}
