import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateParticipantDto } from './dto/update-participant.to';

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

  findOne(id: number) {
    return this.prismaService.participant.findUnique({
      where: {
        id
      }
    })
  }
  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.prismaService.participant.update({
      where: {
        id
      },
      data: updateParticipantDto
    });
  }
}
