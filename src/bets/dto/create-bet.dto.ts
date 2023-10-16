import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBetDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description: 'Bet score for home team',
    })
    homeTeamScore: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description: 'Bet score for away team',
    })
	awayTeamScore: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1000,
        description: 'Bet amount',
    })
	amountBet: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description: 'Game id',
    })
	gameId: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description: 'Participant id',
    })
	participantId: number;
}
