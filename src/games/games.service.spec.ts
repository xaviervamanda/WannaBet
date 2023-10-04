import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ParticipantAmountWon } from '../utils/participantAmountWon';
import { CreateGameDto } from './dto/create-game.dto';
import { faker } from '@faker-js/faker';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService, GamesRepository, PrismaService, ParticipantAmountWon],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should create a game', () => {
    const game: CreateGameDto = new CreateGameDto();
    game.homeTeamName = faker.internet.avatar();
    game.awayTeamName = faker.internet.avatar();

    const promise = service.create(game);
    expect(promise).resolves.toEqual({
      id: expect.any(Number),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  });
});
