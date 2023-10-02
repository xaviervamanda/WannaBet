import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateParticipantDto } from './dto/update-participant.to';

@Injectable()
export class ParticipantsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    return await this.prismaService.participant.create({
      data: createParticipantDto
    });
  }

  async findAll() {
    return await this.prismaService.participant.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.participant.findUnique({
      where: {
        id
      }
    })
  }
  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return await this.prismaService.participant.update({
      where: {
        id
      },
      data: updateParticipantDto
    });
  }
}
