import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateGameDto {
    @IsNumber()
    @ApiProperty({
        example: 2,
        description: "Final score of the home team",
    })
    homeTeamScore: number;

    @IsNumber()
    @ApiProperty({
        example: 2,
        description: "Final score of the away team",
    })
    awayTeamScore: number;
}