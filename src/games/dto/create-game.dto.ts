import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class CreateGameDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Brazil",
        description: "Name of the home team",
    })
    homeTeamName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Uruguay",
        description: "Name of the away team",
    })
	awayTeamName: string;

}
