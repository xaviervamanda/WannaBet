import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ParticipantFactory } from '../factories/participant.factory';
import { PrismaService } from '../../src/prisma/prisma.service';
import { E2EUtils } from '../utils/e2e-utils';
import {faker} from '@faker-js/faker';
import { CreateParticipantDto } from '../../src/participants/dto/create-participant.dto';

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

  it('POST /participants => should create a participant', async () => {
    const participant: CreateParticipantDto = new CreateParticipantDto();
    participant.name = faker.person.firstName();
    participant.balance = 1000;

    await request(app.getHttpServer())
      .post("/participants")
      .send(participant)
      .expect(HttpStatus.CREATED);

    const participants = await prisma.participant.findMany();
    expect(participants).toHaveLength(1);
    expect(participants[0]).toEqual({
      id: expect.any(Number),
      name: participant.name,
      balance: participant.balance,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  });

  it('POST /participants => should not create a participant with balance less than R$10', async () => {
    const participant: CreateParticipantDto = new CreateParticipantDto();
    participant.name = faker.person.firstName();
    participant.balance = 900;

    
    await request(app.getHttpServer())
      .post("/participants")
      .send(participant)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);
  });
});
