import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { BetsRepository } from './bets.repository';

@Module({
  controllers: [BetsController],
  providers: [BetsService, BetsRepository],
})
export class BetsModule {}
