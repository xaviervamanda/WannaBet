import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesRepository } from './games.repository';
import { UpdateGameDto } from './dto/update-game.dto';
import { BetsService } from '../bets/bets.service';
import { BetStatus } from '../bets/dto/update-bet.dto';
import { ParticipantAmountWon } from '../utils/participantAmountWon';

@Injectable()
export class GamesService {
  constructor(
    private readonly betsService: BetsService,
    private readonly gamesRepository: GamesRepository,
    private readonly utils: ParticipantAmountWon
    ) {}
  async create(createGameDto: CreateGameDto) {
    return await this.gamesRepository.create(createGameDto);
  }
  
  async finishGame(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.gamesRepository.findOne(id);
    if (game.isFinished) throw new BadRequestException('Game is already finished');
    
    game.Bet.forEach(async bet => {
      if (game.homeTeamScore === bet.homeTeamScore && game.awayTeamScore === bet.awayTeamScore) {
            return await this.betsService.update(bet.id, { status: BetStatus.WON })
        }
        return await this.betsService.update(bet.id, { status: BetStatus.LOST })
    })
    const denominator = this.utils.amountWon(game.Bet);
    game.Bet.forEach(async bet => {
      const amountWon = Math.floor(bet.amountBet/denominator);
      if (bet.status === BetStatus.WON){
        await this.betsService.update(bet.id, { amountWon });
      }
      await this.betsService.update(bet.id, { amountWon: 0 });
    })
    return await this.gamesRepository.finishGame(id, updateGameDto);
  }

  async findAll() {
    return await this.gamesRepository.findAll();
  }

  async findOne(id: number) {
    return await this.gamesRepository.findOne(id);
  }

}
