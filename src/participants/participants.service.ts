import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsRepository } from './participants.repository';
import { UpdateParticipantDto } from './dto/update-participant.to';

@Injectable()
export class ParticipantsService {
  constructor(private readonly participantsRepository: ParticipantsRepository) {}
  async create(createParticipantDto: CreateParticipantDto) {
    const { balance } = createParticipantDto;
    if (balance < 1000) throw new UnprocessableEntityException("Balance can't be less than R$10,00");

    return await this.participantsRepository.create(createParticipantDto);
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return await this.participantsRepository.update(id, updateParticipantDto);
  }

  async findOne(id: number) {
    return await this.participantsRepository.findOne(id);
  }
  async findAll() {
    return await this.participantsRepository.findAll();
  }

}
