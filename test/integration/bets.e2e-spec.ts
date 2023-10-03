import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreateBetDto } from '../../src/bets/dto/create-bet.dto';
import { faker } from '@faker-js/faker';
import { ParticipantFactory } from '../factories/participant.factory';
import { PrismaService } from '../../src/prisma/prisma.service';
import { E2EUtils } from '../utils/e2e-utils';
import { GameFactory } from '../factories/game.factory';
import { Bet, BetStatus } from '@prisma/client';

describe('Bets E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();

    await E2EUtils.cleanDb(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  })

  it('POST /bets => should create a bet', async () => {
    const participant = await new ParticipantFactory(prisma)
      .withName(faker.person.firstName())
      .withBalance(1000)
      .persist();

    const game = await new GameFactory(prisma)
      .withHomeTeamName(faker.internet.avatar())
      .withAwayTeamName(faker.internet.avatar())
      .persist();

    const bet: CreateBetDto = new CreateBetDto();
    bet.homeTeamScore = 2;
    bet.awayTeamScore = 1;
    bet.amountBet = 100;
    bet.gameId = game.id;
    bet.participantId = participant.id;

    await request(app.getHttpServer())
      .post('/bets')
      .send(bet)
      .expect(HttpStatus.CREATED)

    const bets = await prisma.bet.findMany();
    expect(bets).toHaveLength(1);
    expect(bets[0]).toEqual<Bet>({
      id: expect.any(Number),
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
      status: BetStatus.PENDING,
      amountWon: null,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  });

  it('POST /bets => should not create a bet when amount bet less than participant balance', async () => {
    const participant = await new ParticipantFactory(prisma)
      .withName(faker.person.firstName())
      .withBalance(1000)
      .persist();

    const game = await new GameFactory(prisma)
      .withHomeTeamName(faker.internet.avatar())
      .withAwayTeamName(faker.internet.avatar())
      .persist();

    const bet: CreateBetDto = new CreateBetDto();
    bet.homeTeamScore = 2;
    bet.awayTeamScore = 1;
    bet.amountBet = 2000;
    bet.gameId = game.id;
    bet.participantId = participant.id;

    await request(app.getHttpServer())
      .post('/bets')
      .send(bet)
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('POST /bets => should not create a bet when game is already finished', async () => {
    const participant = await new ParticipantFactory(prisma)
      .withName(faker.person.firstName())
      .withBalance(1000)
      .persist();

    const game = await prisma.game.create({
      data: {
        homeTeamName: faker.internet.avatar(),
        awayTeamName: faker.internet.avatar(),
        isFinished: true
      }
    })

    const bet: CreateBetDto = new CreateBetDto();
    bet.homeTeamScore = 2;
    bet.awayTeamScore = 1;
    bet.amountBet = 100;
    bet.gameId = game.id;
    bet.participantId = participant.id;

    await request(app.getHttpServer())
      .post('/bets')
      .send(bet)
      .expect(HttpStatus.BAD_REQUEST)
  });

});
