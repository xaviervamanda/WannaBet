import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';
import { E2EUtils } from '../utils/e2e-utils';
import { GameFactory } from '../factories/game.factory';
import { Game } from '@prisma/client';
import { CreateGameDto } from '../../src/games/dto/create-game.dto';


describe('Games E2E Tests', () => {
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

  it('GET /games => should get all games', async () => {

    await new GameFactory(prisma)
      .withHomeTeamName(faker.internet.avatar())
      .withAwayTeamName(faker.internet.avatar())
      .persist();

    await new GameFactory(prisma)
      .withHomeTeamName(faker.internet.avatar())
      .withAwayTeamName(faker.internet.avatar())
      .persist();

    const { status, body } = await request(app.getHttpServer()).get("/games");
    expect(status).toBe(HttpStatus.OK);
    expect(body).toHaveLength(2);

  });

  it('GET /games/:id => should get a especific game', async () => {

    const game = await new GameFactory(prisma)
      .withHomeTeamName(faker.internet.avatar())
      .withAwayTeamName(faker.internet.avatar())
      .persist();

    const { status, body } = await request(app.getHttpServer()).get(`/games/${game.id}`);
    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual({
      id: game.id,
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Bet: expect.any(Array)
    })
  });

    it('POST /games => should create a game', async () => {

      const game: CreateGameDto = new CreateGameDto();
      game.homeTeamName = faker.internet.avatar();
      game.awayTeamName = faker.internet.avatar();
        

      await request(app.getHttpServer())
        .post(`/games`)
        .send(game)
        .expect(HttpStatus.CREATED)
  
      const posts = await prisma.game.findMany();
      expect(posts).toHaveLength(1);
      expect(posts[0]).toEqual<Game>({
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

    it('POST /games/:id/finish => should finish a game', async () => {

      const game = await new GameFactory(prisma)
      .withHomeTeamName(faker.internet.avatar())
      .withAwayTeamName(faker.internet.avatar())
      .persist();

      const finishedGame = {
        homeTeamScore: 2,
        awayTeamScore: 2
      }

      await request(app.getHttpServer())
        .post(`/games/${game.id}/finish`)
        .send(finishedGame)
        .expect(HttpStatus.CREATED)
  
      const posts = await prisma.game.findMany();
      expect(posts).toHaveLength(1);
      expect(posts[0]).toEqual<Game>({
        id: game.id,
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: 2,
        awayTeamScore: 2,
        isFinished: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    });

    it('POST /games/:id/finish => should not finish a game that is already finished', async () => {

      const game = await prisma.game.create({
        data: {
          homeTeamName: faker.internet.avatar(),
          awayTeamName: faker.internet.avatar(),
          isFinished: true
        }
      })

      const finishedGame = {
        homeTeamScore: 2,
        awayTeamScore: 2
      }

      await request(app.getHttpServer())
        .post(`/games/${game.id}/finish`)
        .send(finishedGame)
        .expect(HttpStatus.BAD_REQUEST)
  
    });

});
