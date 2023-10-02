import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantsRepository } from './participants.repository';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantsRepository],
  exports: [ParticipantsService]
})
export class ParticipantsModule {}
