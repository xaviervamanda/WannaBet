import { Bet, BetStatus, Game } from "@prisma/client";

export class ParticipantAmountWon {
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
}