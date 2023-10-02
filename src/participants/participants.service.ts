import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsRepository } from './participants.repository';
import { UpdateParticipantDto } from './dto/update-participant.to';

@Injectable()
export class ParticipantsService {
  constructor(private readonly participantsRepository: ParticipantsRepository) {}
  create(createParticipantDto: CreateParticipantDto) {
    const { balance } = createParticipantDto;
    if (balance < 1000) throw new UnprocessableEntityException("Balance can't be less than R$10,00");

    return this.participantsRepository.create(createParticipantDto);
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.participantsRepository.update(id, updateParticipantDto);
  }

  findOne(id: number) {
    return this.participantsRepository.findOne(id);
  }
  findAll() {
    return this.participantsRepository.findAll();
  }

}
