import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParticipantsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(createParticipantDto: CreateParticipantDto) {
    return this.prismaService.participant.create({
      data: createParticipantDto
    });
  }

  findAll() {
    return this.prismaService.participant.findMany();
  }
}
