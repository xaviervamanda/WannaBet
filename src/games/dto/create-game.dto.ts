import { IsString } from "class-validator"

export class CreateGameDto {
    @IsString()
    homeTeamName: string;

    @IsString()
	awayTeamName: string;

}
