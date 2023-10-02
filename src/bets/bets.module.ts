import { Module, forwardRef } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { BetsRepository } from './bets.repository';
import { ParticipantsModule } from '../participants/participants.module';
import { GamesModule } from '../games/games.module';

@Module({
  controllers: [BetsController],
  providers: [BetsService, BetsRepository],
  exports: [BetsService],
  imports: [ParticipantsModule, forwardRef(() => GamesModule)]
})
export class BetsModule {}
