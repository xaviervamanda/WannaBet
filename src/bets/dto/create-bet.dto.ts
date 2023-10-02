import { IsNumber } from "class-validator";

export class CreateBetDto {
    @IsNumber()
    homeTeamScore: number;

    @IsNumber()
	awayTeamScore: number;
    
    @IsNumber()
	amountBet: number;
    
    @IsNumber()
	gameId: number;
    
    @IsNumber()
	participantId: number;
}
