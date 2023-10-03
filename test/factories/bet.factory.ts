import { PrismaService } from "../../src/prisma/prisma.service";

export class BetFactory { 
    private homeTeamScore: number;
	private awayTeamScore: number; 
	private amountBet: number; 
    private gameId: number;
	private participantId: number;

  constructor(private readonly prisma: PrismaService) { }
  
  withHomeTeamScore(homeTeamScore: number) {
    this.homeTeamScore = homeTeamScore;
    return this;
  }

  withAwayTeamScore(awayTeamScore: number) {
    this.awayTeamScore = awayTeamScore;
    return this;
  }

  withAmountBet(amountBet: number) {
    this.amountBet = amountBet;
    return this;
  }
  
  withGameId(gameId: number) {
    this.gameId = gameId;
    return this;
  }

  withParticipantId(participantId: number) {
    this.participantId = participantId;
    return this;
  }

  build() {
    return {
      homeTeamScore: this.homeTeamScore,
      awayTeamScore: this.awayTeamScore,
      amountBet: this.amountBet,
      gameId: this.gameId,
      participantId: this.participantId
    }
  }

  async persist() {
    const bet = this.build();
    return await this.prisma.bet.create({
      data: bet
    })
  }


}