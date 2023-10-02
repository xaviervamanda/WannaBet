import { Module, forwardRef } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { ParticipantAmountWon } from 'src/utils/participantAmountWon';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, ParticipantAmountWon],
  exports: [GamesService],
})
export class GamesModule {}
