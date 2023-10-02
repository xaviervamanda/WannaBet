import { Bet, BetStatus, Game } from "@prisma/client";
import { BetsService } from "src/bets/bets.service";

export class ParticipantAmountWon {
    constructor (
        private readonly betsService: BetsService,
    ) {}

    wonOrLost (game: any) {
        game.Bet.forEach(async bet => {
            if (game.homeTeamScore === bet.homeTeamScore && game.awayTeamScore === bet.awayTeamScore) {
                  return await this.betsService.update(bet.id, { status: BetStatus.WON })
              }
              return await this.betsService.update(bet.id, { status: BetStatus.LOST })
          })
    }
    amountWon (bet: Bet[]) {
        const  houseTax = 0.3;
        let totalBet = 0;
        let totalWon = 0;
        bet.map(bet => {
            totalBet += bet.amountBet
            if (bet.status === BetStatus.WON) {
                totalWon += bet.amountBet
            }
        })
        return totalWon * totalBet * (1 - houseTax)     
    }

    updateAmount (bet: Bet[]) {
        const denominator = this.amountWon(bet);
        bet.forEach(async bet => {
            const amountWon = Math.floor(bet.amountBet/denominator);
            if (bet.status === BetStatus.WON){
              await this.betsService.update(bet.id, { amountWon });
            }
            await this.betsService.update(bet.id, { amountWon: 0 });
          })
    }
}