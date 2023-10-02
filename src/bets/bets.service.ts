import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { BetsRepository } from './bets.repository';
import { ParticipantsService } from 'src/participants/participants.service';
import { GamesService } from 'src/games/games.service';

@Injectable()
export class BetsService {
  constructor(
    private readonly betsRepository: BetsRepository,
    private readonly participantsService: ParticipantsService,
    private readonly gamesService: GamesService
    ) {}
  async create(createBetDto: CreateBetDto) {
    const { participantId, gameId } = createBetDto;

    const participant = await this.participantsService.findOne(participantId);
    if (participant.balance < createBetDto.amountBet) throw new BadRequestException("Your balance is not enough for this bet!");

    const game = await this.gamesService.findOne(gameId);
    if (game.isFinished) throw new BadRequestException("This game is already finished!");
    
    return await this.betsRepository.create(createBetDto);
  }

}
