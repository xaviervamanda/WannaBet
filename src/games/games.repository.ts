import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createGameDto: CreateGameDto) {
    return await this.prismaService.game.create({
      data: createGameDto
    });
  }

  async finishGame(id: number, updateGameDto: UpdateGameDto) {
    const data = {
      ...updateGameDto,
      isFinished: true
    }
    return await this.prismaService.game.update({
      where: {
        id
      },
      data: updateGameDto
    });
  }
  async findAll() {
    return await this.prismaService.game.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.game.findUnique({
      where: {
        id,
      },
      include: {
        Bet: true
      }
    });
  }

}
