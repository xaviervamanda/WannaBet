import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { BetsRepository } from './bets.repository';
import { ParticipantsModule } from 'src/participants/participants.module';

@Module({
  controllers: [BetsController],
  providers: [BetsService, BetsRepository],
  exports: [BetsService],
  imports: [ParticipantsModule]
})
export class BetsModule {}
