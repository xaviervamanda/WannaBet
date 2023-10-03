import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class CreateGameDto {
    @IsString()
    @ApiProperty({
        example: "Brazil",
        description: "Name of the home team",
    })
    homeTeamName: string;

    @IsString()
    @ApiProperty({
        example: "Uruguay",
        description: "Name of the away team",
    })
	awayTeamName: string;

}
