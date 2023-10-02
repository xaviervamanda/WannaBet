import { Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BetsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createBetDto: CreateBetDto) {
    return await this.prismaService.bet.create({
      data: createBetDto
    });
  }

  async update(id: number, information: any) {
    return await this.prismaService.bet.update({
      where: {
        id
      },
      data: information
    });
  }
}
