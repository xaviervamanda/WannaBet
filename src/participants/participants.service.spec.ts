import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsService } from './participants.service';
import { ParticipantsRepository } from './participants.repository';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { faker } from '@faker-js/faker';
import { UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

describe('ParticipantsService', () => {
  let service: ParticipantsService;
  let repository: ParticipantsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsService, ParticipantsRepository, PrismaService],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
    repository = module.get<ParticipantsRepository>(ParticipantsRepository);
  });

  it('should return status 422 when user balance is less 1000 cents', () => {
    const participant: CreateParticipantDto = new CreateParticipantDto();
    participant.name = faker.person.firstName();
    participant.balance = 900;

    const promise = service.create(participant);
    expect(promise).rejects.toThrow(new UnprocessableEntityException("Balance can't be less than R$10,00"));
  });

  it('should create a participant', () => {
    const participant: CreateParticipantDto = new CreateParticipantDto();
    participant.name = faker.person.firstName();
    participant.balance = 1000;

    const promise = service.create(participant);
    expect(promise).resolves.toEqual({
      id: expect.any(Number),
      name: participant.name,
      balance: participant.balance,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  });
});
