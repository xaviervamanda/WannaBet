import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ParticipantFactory } from '../factories/participant.factory';
import { PrismaService } from '../../src/prisma/prisma.service';
import { E2EUtils } from '../utils/e2e-utils';
import {faker} from '@faker-js/faker';

describe('Participants E2E Tests', () => {
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

  it('GET /participants => should get all participants', async () => {

    await new ParticipantFactory(prisma)
      .withName(faker.person.firstName())
      .withBalance(1000)
      .persist();

    await new ParticipantFactory(prisma)
    .withName(faker.person.firstName())
    .withBalance(2000)
    .persist();

      const { status, body } = await request(app.getHttpServer()).get("/participants");
      expect(status).toBe(HttpStatus.OK);
      expect(body).toHaveLength(2);
  });
});
