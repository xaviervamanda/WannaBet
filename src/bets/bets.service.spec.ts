import { Test, TestingModule } from '@nestjs/testing';
import { BetsService } from './bets.service';
import { BetsRepository } from './bets.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ParticipantsService } from '../participants/participants.service';
import { GamesService } from '../games/games.service';
import { ParticipantsRepository } from '../participants/participants.repository';
import { GamesRepository } from '../games/games.repository';
import { ParticipantAmountWon } from '../utils/participantAmountWon';
import { faker } from '@faker-js/faker';
import { CreateBetDto } from './dto/create-bet.dto';
import { BadRequestException } from '@nestjs/common';

describe('BetsService', () => {
  let service: BetsService;
  let repository: BetsRepository;
  let participantsService: ParticipantsService;
  let gamesService: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetsService, BetsRepository, PrismaService, ParticipantsService, ParticipantsRepository, GamesService, GamesRepository, ParticipantAmountWon],
    }).compile();

    service = module.get<BetsService>(BetsService);
    repository = module.get<BetsRepository>(BetsRepository);
    participantsService = module.get<ParticipantsService>(ParticipantsService);
    gamesService = module.get<GamesService>(GamesService);

    jest.clearAllMocks();
  });

  it('should respond with status 400 when user balance is less than bet amount', () => {
    jest.spyOn(participantsService, 'findOne').mockResolvedValue({
      id: 1,
      name: faker.person.firstName(),
      balance: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const bet: CreateBetDto = new CreateBetDto();
    bet.homeTeamScore = 2;
    bet.awayTeamScore = 1;
    bet.amountBet = 2000;
    bet.gameId = 1;
    bet.participantId = 1;

    const promise = service.create(bet);
    expect(promise).rejects.toThrow(new BadRequestException("Your balance is not enough for this bet!"));
  });

  it('should respond with status 400 when game is already finished', () => {
    jest.spyOn(participantsService, 'findOne').mockResolvedValue({
      id: 1,
      name: faker.person.firstName(),
      balance: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    jest.spyOn(gamesService, 'findOne').mockResolvedValue({
      id: 1,
      homeTeamName: faker.internet.avatar(),
      awayTeamName: faker.internet.avatar(),
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      Bet: expect.any(Array),
    })

    const bet: CreateBetDto = new CreateBetDto();
    bet.homeTeamScore = 2;
    bet.awayTeamScore = 1;
    bet.amountBet = 1000;
    bet.gameId = 1;
    bet.participantId = 1;

    const promise = service.create(bet);
    expect(promise).rejects.toThrow(new BadRequestException("This game is already finished!"));
  });

  it('should create a bet', () => {
    jest.spyOn(participantsService, 'findOne').mockResolvedValue({
      id: 1,
      name: faker.person.firstName(),
      balance: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    jest.spyOn(gamesService, 'findOne').mockResolvedValue({
      id: 1,
      homeTeamName: faker.internet.avatar(),
      awayTeamName: faker.internet.avatar(),
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      Bet: expect.any(Array),
    })

    const bet: CreateBetDto = new CreateBetDto();
    bet.homeTeamScore = 2;
    bet.awayTeamScore = 1;
    bet.amountBet = 1000;
    bet.gameId = 1;
    bet.participantId = 1;

    const promise = service.create(bet);
    expect(promise).resolves.toEqual({
      id: expect.any(Number),
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
      status: "PENDING",
      amountWon: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })


});
