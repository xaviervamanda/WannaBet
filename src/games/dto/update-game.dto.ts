import { IsNumber } from "class-validator";

export class UpdateGameDto {
    @IsNumber()
    homeTeamScore: number;

    @IsNumber()
    awayTeamScore: number;
}