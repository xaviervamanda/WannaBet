import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesRepository } from './games.repository';
import { UpdateGameDto } from './dto/update-game.dto';
import { ParticipantAmountWon } from '../utils/participantAmountWon';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly utils: ParticipantAmountWon
    ) {}
  async create(createGameDto: CreateGameDto) {
    return await this.gamesRepository.create(createGameDto);
  }
  
  async finishGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.gamesRepository.findOne(id);
    if (game.isFinished) throw new BadRequestException('Game is already finished');
    
    this.utils.wonOrLost(game);
    this.utils.updateAmount(game.Bet);
    
    return await this.gamesRepository.finishGame(id, updateGameDto);
  }

  async findAll() {
    return await this.gamesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.gamesRepository.findOne(id);
  }

}
